import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { UpdatenoteComponent } from '../updatenote/updatenote.component';


@Component({
  selector: 'app-displaynote',
  templateUrl: './displaynote.component.html',
  styleUrls: ['./displaynote.component.scss']
})
export class DisplaynoteComponent implements OnInit {
  isPin = false;
  notesUpdatedData: any;
  @Input() userNoteList: any;
  @Output() updateNoteEvent = new EventEmitter<any>();

  constructor(public dialog: MatDialog) { 
    console.log(this.userNoteList);
  }

  ngOnInit(): void {
  }

  openDialog(noteData: any) {
    const dialogRef = this.dialog.open(UpdatenoteComponent, {
      width: '500px',
      data: noteData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed:' +result);
      this.updateNoteEvent.emit(result);
    });
  }

  handlePin() {
    this.isPin = !this.isPin;
  }
}
