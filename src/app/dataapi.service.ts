import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataapiService {
  constructor(
    public http: HttpClient
  ) { }

  //ฟังก์ชั่นเชื่อมต่อ api ระบบบันทึกข้อมูล
  addproduct(formData: any) {
    return this.http.post('http://localhost/crudapi/upload.php', formData);
  }  

  //เชื่อมต่อ api แสดงข้อมูล
  showproduct() {
    return this.http.get('http://localhost/crudapi/read.php');
  }

  //เชื่อมต่อ api ลบข้อมูล
  deleteproduct(id: number) {
    return this.http.delete('http://localhost/crudapi/delete.php?id='+id);
  }

  //เชื่อมต่อ api แก้ไขข้อมูล
  updateproduct(formData: FormData) {
    const headers = new HttpHeaders();
    // Remove Content-Type header to let browser set it automatically with boundary
    return this.http.post('http://localhost/crudapi/update.php', formData, {
      headers: headers
    });
  }
}