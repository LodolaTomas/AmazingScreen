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
  userForm:FormGroup;
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
   this.fireAuth.doLogin(this.userForm.value.email,this.userForm.value.password)
   .then(resolve=>{
     if(resolve==true){
      
      this.router.navigateByUrl('/admin')
     }
   })
  }

  isValidField(field: string): string {
    const validateField = this.userForm.get(field);
    return !validateField?.valid && validateField?.touched
      ? 'is-invalid'
      : validateField?.touched
        ? 'is-valid'
        : '';
  }

  private initForm(): void {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.isEmail)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }


}
