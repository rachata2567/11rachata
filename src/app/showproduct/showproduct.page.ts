import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonLabel, 
         IonItem, IonThumbnail, IonCard, IonCardContent, IonList, 
         IonCardSubtitle, IonCardTitle, IonCardHeader, AlertController } from '@ionic/angular/standalone';
import { DataapiService } from '../dataapi.service';

@Component({
  selector: 'app-showproduct',
  templateUrl: './showproduct.page.html',
  styleUrls: ['./showproduct.page.scss'],
  standalone: true,
  imports: [
    IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, 
    IonItem, IonLabel, IonButton, IonContent, IonHeader, IonTitle, 
    IonToolbar, CommonModule, FormsModule, IonThumbnail, IonCard, IonList
  ],
})
export class ShowproductPage implements OnInit {
  products: any = [];
  baseUrl = 'http://localhost/crudimg/';

  constructor(
    private dataApiService: DataapiService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.showpro();
  }

  gotoaddproduct() {
    window.location.href = '/addproduct';
  }

  showpro() {
    this.dataApiService.showproduct().subscribe({
      next: (data: any) => {
        this.products = data;
        console.log('Products:', this.products);
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }

  async editProduct(product: any) {
    const alert = await this.alertController.create({
      header: 'แก้ไขสินค้า',
      inputs: [
        {
          name: 'name',
          type: 'text',
          value: product.name,
          placeholder: 'ชื่อสินค้า'
        },
        {
          name: 'price',
          type: 'number',
          min: 0,
          value: product.price,
          placeholder: 'ราคา'
        }
      ],
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel'
        },
        {
          text: 'เลือกรูปภาพ',
          handler: () => {
            this.selectImage(product);
            return false; // Keep the alert open
          }
        },
        {
          text: 'บันทึก',
          handler: (data) => {
            if (data.name && data.price) {
              this.updateProduct(product.id, data, product.image);
              return true;
            } else {
              return false;
            }
          }
        }
      ]
    });
  
    await alert.present();
  }
  
  // Add this new function to handle image selection
  async selectImage(product: any) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = async (e: any) => {
      const file = e.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append('id', product.id.toString());
        formData.append('name', product.name);
        formData.append('price', product.price.toString());
        formData.append('image', file);
  
        const alert = await this.alertController.create({
          header: 'ยืนยัน',
          message: 'คุณต้องการอัพเดทรูปภาพใช่หรือไม่?',
          buttons: [
            {
              text: 'ยกเลิก',
              role: 'cancel'
            },
            {
              text: 'ยืนยัน',
              handler: () => {
                this.updateProduct(product.id, { name: product.name, price: product.price }, file);
              }
            }
          ]
        });
        await alert.present();
      }
    };
  
    input.click();
  }
  
  // Update the updateProduct function to handle image uploads
  updateProduct(id: number, updatedData: { name: string; price: number }, newImage?: File) {
    const formData = new FormData();
    formData.append('id', id.toString());
    formData.append('name', updatedData.name);
    formData.append('price', updatedData.price.toString());
    
    if (newImage) {
      formData.append('image', newImage);
    }
  
    this.dataApiService.updateproduct(formData).subscribe({
      next: async (response: any) => {
        if (response.status === 'success') {
          const alert = await this.alertController.create({
            header: 'สำเร็จ',
            message: 'แก้ไขสินค้าเรียบร้อยแล้ว',
            buttons: [{
              text: 'ตกลง',
              handler: () => {
                this.showpro(); // Reload the products list
              }
            }]
          });
          await alert.present();
        } else {
          const alert = await this.alertController.create({
            header: 'ผิดพลาด',
            message: 'ไม่สามารถแก้ไขสินค้าได้: ' + (response.message || 'Unknown error'),
            buttons: ['ตกลง']
          });
          await alert.present();
        }
      },
      error: async (error) => {
        console.error('Error:', error);
        const alert = await this.alertController.create({
          header: 'ผิดพลาด',
          message: 'เกิดข้อผิดพลาดในการแก้ไขสินค้า: ' + (error.message || 'Unknown error'),
          buttons: ['ตกลง']
        });
        await alert.present();
      }
    });
  }

  updateproduct(id: number, updatedData: { name: string; price: number }) {
    const formData = new FormData();
    formData.append('id', id.toString());
    formData.append('name', updatedData.name);
    formData.append('price', updatedData.price.toString());

    this.dataApiService.updateproduct(formData).subscribe({
      next: async (response: any) => {
        if (response.status === 'success') {
          const alert = await this.alertController.create({
            header: 'สำเร็จ',
            message: 'แก้ไขสินค้าเรียบร้อยแล้ว',
            buttons: [{
              text: 'ตกลง',
              handler: () => {
                this.showpro(); // Reload the products list
              }
            }]
          });
          await alert.present();
        } else {
          const alert = await this.alertController.create({
            header: 'ผิดพลาด',
            message: 'ไม่สามารถแก้ไขสินค้าได้: ' + (response.message || 'Unknown error'),
            buttons: ['ตกลง']
          });
          await alert.present();
        }
      },
      error: async (error) => {
        console.error('Error:', error);
        const alert = await this.alertController.create({
          header: 'ผิดพลาด',
          message: 'เกิดข้อผิดพลาดในการแก้ไขสินค้า: ' + (error.message || 'Unknown error'),
          buttons: ['ตกลง']
        });
        await alert.present();
      }
    });
  }

  deletepro(id: any) {
    if(confirm('Are you sure you want to delete this image?')) {
      this.dataApiService.deleteproduct(id).subscribe(
        (response: any) => {
          if(response.status === 'success') {
            alert('Image deleted successfully!');
            this.showpro();
          } else {
            alert('Failed to delete image: ' + response.message);
          }
        },
        (error) => {
          console.error(error);
          alert('Failed to delete image:'+ error.message);
        }
      );
    }
  }

  getImageUrl(imagePath: string) {
    return this.baseUrl + imagePath;
  }
}