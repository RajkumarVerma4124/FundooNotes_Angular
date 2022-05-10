import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-displaynote',
  templateUrl: './displaynote.component.html',
  styleUrls: ['./displaynote.component.scss']
})
export class DisplaynoteComponent implements OnInit {
  isPin = false;
  @Input() userNoteList: any;

  constructor() { 

    console.log(this.userNoteList);
  }

  ngOnInit(): void {
  }

  handlePin() {
    this.isPin = !this.isPin;
  }
}
