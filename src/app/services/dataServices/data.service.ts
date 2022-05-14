import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private messageSource = new BehaviorSubject('');
  recievedData = this.messageSource.asObservable();

  // private collabUserData = new BehaviorSubject('');
  // recievedCollabData = this.collabUserData.asObservable();

  constructor() { }

  SendData(message: string) {
    this.messageSource.next(message)
  }
  // SendCollabUserArr(collabUser: any) {
  //   this.collabUserData.next(collabUser)
  //   console.log(collabUser)
  // }
}
