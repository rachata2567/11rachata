import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton } from '@ionic/angular/standalone';
import { DataapiService } from '../dataapi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.page.html',
  styleUrls: ['./addproduct.page.scss'],
  standalone: true,
  imports: [IonButton, IonInput, IonLabel, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class AddproductPage implements OnInit {

  txtname: string = '';
  txtprice: string = '';
  selectFile: File | null = null;
  dataapi: any;

  constructor(
    private dataApiService: DataapiService,
    private router: Router
  ) { }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectFile = file;
    }
  }

  ngOnInit() { }

  addproduct() {
    const formData = new FormData();
    formData.append('name', this.txtname);
    formData.append('price', this.txtprice);

    if (this.selectFile) {
      formData.append('image', this.selectFile, this.selectFile.name);
    }

    this.dataApiService.addproduct(formData).subscribe({
      next: (res: any) => {
        console.log("บันทึกข้อมูลสำเร็จ", res);
        this.txtname = '';
        this.txtprice = '';
        this.selectFile = null;
        window.location.href = '/showproduct';
      },
      error: (err) => {
        console.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล", err);
        if(err.error instanceof ProgressEvent) {
          console.error('เกิดข้อผิดพลาดในการเชื่อต่อกับเซิร์ฟเวอร์')
      }
    }
    });
  }
}
