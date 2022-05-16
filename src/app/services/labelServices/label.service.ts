import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../httpServices/http.service';

@Injectable({
  providedIn: 'root'
})
export class LabelService {
  token: any;

  constructor(private httpService: HttpService) {
    this.token = localStorage.getItem('token');
  }

  addLabelName(labelName: any) {
    console.log(labelName)
    let header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    }
    return this.httpService.postService('/Labels/Create='+labelName, {}, true, header);
  }

  addLabelToNote(labelData: any) {
    console.log(labelData)
    let header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    }
    return this.httpService.postService('/Labels/AddToNote', labelData, true, header);
  }

  editLabelName(labelId: any, labelName: any) {
    console.log(labelId, labelName)
    let header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    }
    return this.httpService.patchService(`/Labels/Edit?newLableName=${labelName}&labelId=${labelId}`, {}, true, header);
  }

  removeLabelName(labelId: any, noteId: any) {
    console.log(labelId, noteId)
    let header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    }
    return this.httpService.deleteService(`/Labels/Remove?labelId=${labelId}&labelId=${noteId}`, true, header);
  }

  deleteLabelName(labelNameId: any) {
    console.log(labelNameId)
    let header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    }
    return this.httpService.deleteService("/Labels/Delete?labelNameId="+labelNameId, true, header);
  }

  getNoteLabels() {
    let header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    }
    return this.httpService.getService("/Collab/GetNotes", true, header);
  }

  getAllLabels() {
    let header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    }
    return this.httpService.getService("/Collab/GetAll", true, header);
  }

  getAllLabelsName() {
    let header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    }
    return this.httpService.getService("/Collab/GetNames", true, header);
  }
}
