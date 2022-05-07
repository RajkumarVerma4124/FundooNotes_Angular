import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-takenote',
  templateUrl: './takenote.component.html',
  styleUrls: ['./takenote.component.scss']
})
export class TakenoteComponent implements OnInit {
  title: any;
  description: any;
  isExpand = false;
  constructor() { }

  ngOnInit(): void {
  }
  main() {
    return this.isExpand === true ? (this.isExpand = false) : (this.isExpand = true);
  }

  addTitle(stringData: any) {
    console.log(stringData.target.value);
    this.title = stringData.target.value;
  }
  addDescription(stringData: any) {
    console.log(stringData.target.value);
    this.description = stringData.target.value;
  }
  addNote(){
    this.isExpand=false;
  }
}

  