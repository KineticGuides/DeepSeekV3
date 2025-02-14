import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { Observable, of, map, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  t: any;
  uid: any;
  url: any;
  menu: any;
  user: any;
  hash: any;
  skipper: any;
  chat_id: any;
  role: any;
  hashBuffer: any;
  current_date: any;
  current_resource: any;
  current_patient: any;
  current_day: any;
  current_practice: any;
  member_id: any;

  constructor(private http: HttpClient) { 
    this.url='http://localhost:8888/abbsi_router.php';
    this.menu='http://localhost:8888/abbsi_menu.php';
    this.user='http://localhost:8888/abbsi_user.php';
  }

  getLocalStorage() {
    if (localStorage.getItem('uid')===null) {
      this.uid="0";
    } else {
      this.uid=localStorage.getItem('uid')
    }
    if (localStorage.getItem('chat_id')===null) {
      this.chat_id="0";
    } else {
      this.chat_id=localStorage.getItem('chat_id')
    }
    if (localStorage.getItem('hash')===null) {
      this.hash="";
    } else {
      this.hash=localStorage.getItem('hash')
    }
    if (localStorage.getItem('member_id')===null) {
      this.member_id="";
    } else {
      this.member_id=localStorage.getItem('member_id')
    }
  }


  getData(path: any, id: any, id2: any, id3: any) {
    this.getLocalStorage();
    const data = {
      "q" : path,
      "id": id,
      "id2": id2,
      "id3": id3,
      "hash": this.hash, 
      "chat_id": this.chat_id,           
      "member_id": this.member_id,      
      "uid": this.uid
    }
  
  this.t= this.http.post(this.url, data);
  return this.t;

  }

  getMenu() {

    this.getLocalStorage();
    const data = {    
      "hash": this.hash, 
      "chat_id": this.chat_id,      
      "uid": this.uid
    }
  
  this.t= this.http.post(this.menu, data);
  return this.t;

  }

  getUser() {
    this.getLocalStorage();
    const data = {    
      "uid": this.uid
    }
  this.t= this.http.post(this.user, data);
  return this.t;
  }

  postData(path: any, formData: any) {
 
    this.getLocalStorage();
    const data = {
      "q" : path,
      "formData": formData,
      "chat_id": this.chat_id,
      "hash": this.hash,    
      "uid": this.uid
    }
  this.t= this.http.post(this.url, data);
  return this.t;

  }

}

