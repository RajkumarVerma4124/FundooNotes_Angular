import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private messageSource = new BehaviorSubject('');
  recievedData = this.messageSource.asObservable();

  private noteDisplay = new BehaviorSubject('');
  recievedNoteDisplay = this.noteDisplay.asObservable();

  constructor() { }

  SendData(message: string) {
    this.messageSource.next(message)
  }

  SendDisplayData(layout: any){
    this.noteDisplay.next(layout)
  }
}
