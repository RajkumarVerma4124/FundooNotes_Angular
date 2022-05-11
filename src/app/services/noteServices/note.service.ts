import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../httpServices/http.service';

@Injectable({
  providedIn: 'root'
})

export class NoteService {
  token: any;

  constructor(private httpService: HttpService) {
    this.token = localStorage.getItem('token');
  }

  createNote(noteData: any) {
    // console.log(reqData)
    let header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    }
    return this.httpService.postService('/Notes/Create', noteData, true, header);
  }

  getUsersNotes() {
    let header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    }
    return this.httpService.getService('/Notes/GetUsers', true, header);
  }

  getAllNotes() {
    let header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    }
    return this.httpService.getService('/Notes/GetAll', true, header);
  }
  
  getNote(noteId: any) {
    console.log(noteId)
    let header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    }
    return this.httpService.getService('/Notes/Get/' + noteId, true, header);
  }

  updateNote(noteData: any, noteId: any) {
    console.log(noteData, noteId)
    let header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    }
    return this.httpService.putService('/Notes/Update?noteId=' + noteId, noteData, true, header);
  }

  trashNote(noteId: any) {
    console.log(noteId)
    let header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    }
    return this.httpService.patchService('/Notes/IsTrash?noteId=' +noteId, {}, true, header);
  }

  deleteNote(noteId: any) {
    console.log(noteId)
    let header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    }
    return this.httpService.deleteService('/Notes/Delete?noteId=' +noteId, true, header);
  }

  archiveNote(noteId: any) {
    console.log(noteId)
    let header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    }
    return this.httpService.patchService('/Notes/IsArchive?noteId=' +noteId, {}, true, header);
  }

  pinNote(noteId: any) {
    console.log(noteId)
    let header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    }
    return this.httpService.patchService('/Notes/IsPinned?noteId=' +noteId, {}, true, header);
  }

  changeNoteColor(noteColorData: any) {
    console.log(noteColorData)
    let header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    }
    return this.httpService.patchService('/Notes/colour', noteColorData, true, header);
  }
}
