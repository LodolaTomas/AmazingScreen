import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { FirebaseService } from 'src/app/service/firebase.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  selectedFiles: FileList;
  url: any;

  constructor(private authSvc:FirebaseService,private adminSvc:AdminService) { }

  ngOnInit(): void {
  }

  logOut():void{
    this.authSvc.logout()
  }

  subirFoto() {
    let file = this.selectedFiles.item(0)
    /* this.adminSvc.upload('/fotos',"test", file); */
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }


}
