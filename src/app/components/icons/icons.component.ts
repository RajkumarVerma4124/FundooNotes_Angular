import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { NoteService } from 'src/app/services/noteServices/note.service';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {
  isArchive: any;
  isTrash: any;
  snackBarRef: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  @Input() noteDataObj: any
  @Output() changeNoteEvent = new EventEmitter<any>();


  constructor(private notesService: NoteService, private snackBar: MatSnackBar) {
   }

  ngOnInit() {

  }

  ngOnChnages() {
    this.isArchive = this.noteDataObj.isArchive;
    this.isTrash = this.noteDataObj.isTrash;
  }

  changeTrashStatus(noteData: any) {
    this.isTrash = !noteData.isTrash;
    this.notesService.trashNote(this.noteDataObj.notesId).subscribe((response: any) => {
      console.log("Note Trashed", response);
      this.changeNoteEvent.emit(response);
      if (response.data.isTrash === true) {
       this.snackBarRef = this.snackBar.open('Note binned', 'Success', {
          duration: 4000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        })
      }
      else {
        this.snackBarRef = this.snackBar.open('Note restored', 'Success', {
          duration: 4000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        })
      }
      // this.snackBarRef.onAction().subscribe(() => {
      //   this.changeTrashStatus(noteData)
      // })
    })
  }

  deleteNote() {
    this.notesService.deleteNote(this.noteDataObj.notesId).subscribe((response: any) => {
      console.log("Note Deleted Successfully", response);
      this.changeNoteEvent.emit(response);
      this.snackBarRef = this.snackBar.open('Note Deleted', 'Success', {
          duration: 4000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        })
    })
  }

  changeArchiveStatus(noteData: any) {
    this.isArchive = !noteData.isArchive;  
    this.notesService.archiveNote(this.noteDataObj.notesId).subscribe((response: any) => {
      console.log("Note Archive Successfully", response.data);
      this.changeNoteEvent.emit(response);
      if (response.data.isArchive === true) {
        this.snackBar.open('Note Archived', 'Success', {
          duration: 4000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        })
      }
      else {
        this.snackBar.open('Note Unarchived', 'Success', {
          duration: 4000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        })
      }
    })
  }
}
