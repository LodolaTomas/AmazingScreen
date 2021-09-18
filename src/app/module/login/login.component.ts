import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/service/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  
  public flag = false;
  private isEmail = /\S+@\S+\.\S+/;
  productForm:FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private fireAuth:FirebaseService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    
  }
  onLogin() {
   this.fireAuth.doLogin(this.productForm.value.email,this.productForm.value.password)
   .then(resolve=>{
     if(resolve==true){
      this.router.navigateByUrl('/admin')
     }
   })
  }

  isValidField(field: string): string {
    const validateField = this.productForm.get(field);
    return !validateField?.valid && validateField?.touched
      ? 'is-invalid'
      : validateField?.touched
        ? 'is-valid'
        : '';
  }

  private initForm(): void {
    this.productForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.isEmail)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }


}
