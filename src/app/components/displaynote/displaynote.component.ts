import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { UpdatenoteComponent } from '../updatenote/updatenote.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoteService } from 'src/app/services/noteServices/note.service';



@Component({
  selector: 'app-displaynote',
  templateUrl: './displaynote.component.html',
  styleUrls: ['./displaynote.component.scss']
})
export class DisplaynoteComponent implements OnInit {
  isPin = false;
  updatedNoteData: any;
  @Input() userNoteList: any;
  @Output() updateNoteEvent = new EventEmitter<any>();

  constructor(public dialog: MatDialog, private notesService: NoteService, private snackBar: MatSnackBar) { 
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
      // console.log('The dialog was closed:' +result);
      this.refreshUpdatedNoteData(result)
    });
  }

  handlePin(noteData: any) {
    noteData.isPinned = !noteData.isPinned
    this.notesService.pinNote(noteData.notesId).subscribe((response: any) => {
      console.log("Note Pin status changed", response.data);
    })
  }

  refreshUpdatedNoteData($event: any) {
    this.updatedNoteData = $event;
    // console.log("Note Refresh Updated",this.updatedNoteData)
    this.updateNoteEvent.emit(this.updatedNoteData);
  }
}
