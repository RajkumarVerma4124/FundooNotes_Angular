import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../httpServices/http.service';

@Injectable({
  providedIn: 'root'
})
export class CollabService {
  token: any;

  constructor(private httpService: HttpService) {
    this.token = localStorage.getItem('token');
   }

  addCollabUser(collabData: any) {
    console.log(collabData)
    let header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    }
    return this.httpService.postService('/Collab/Add', collabData, true, header);
  }

  deleteCollabUser(collabId: any, noteId: any) {
    console.log(collabId, noteId);
    let header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    }
    return this.httpService.deleteService(`/Collab/Delete?collabId=${collabId}&noteId=${noteId}`, true, header);
  }

  getCollabUser(noteId: any) {
    console.log(noteId);
    let header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    }
    return this.httpService.getService("/Collab/Get?noteId="+noteId, true, header);
  }

  getAllCollabUser() {
    let header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    }
    return this.httpService.getService("/Collab/GetAll", true, header);
  }
}
