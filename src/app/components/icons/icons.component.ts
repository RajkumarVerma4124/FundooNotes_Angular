import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { NoteService } from 'src/app/services/noteServices/note.service';
import { NoteColorModel } from 'src/app/models/noteColorModel';


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
  @Output() changeNoteStatus = new EventEmitter<any>();
  colorsPaletteArr = [
                        { code: "white", name: "Default" }, 
                        { code: "#f28b82", name: "Red" }, 
                        { code: "#fbbc04", name: "Orange" }, 
                        { code: "#fff475", name: "Yellow" }, 
                        { code: "#ccff90", name: "Green" }, 
                        { code: "#a7ffeb", name: "Teal" },
                        { code: "#cbf0f8", name: "Blue" }, 
                        { code: "#aecbfa", name: "Dark blue" }, 
                        { code: "#d7aefb", name: "Purple" }, 
                        { code: "#fdcfe8", name: "Pink" }, 
                        { code: "#e6c9a8", name: "Brown" }, 
                        { code: "#e8eaed", name: "Grey" }
                     ];

  noteColor!: NoteColorModel;

  noteType(): NoteColorModel {
    return this.noteColor = {
      noteId: "",
      newColor: "",
    }
  }

  @Input() noteColorInput: NoteColorModel = this.noteType();

  constructor(private notesService: NoteService, private snackBar: MatSnackBar) {
   }

  ngOnInit() {
    this.isArchive = this.noteDataObj.isArchive;
    this.isTrash = this.noteDataObj.isTrash;
  }

  ngOnChnages() {
    // this.isArchive = this.noteDataObj.isArchive;
    // this.isTrash = this.noteDataObj.isTrash;
  }

  changeTrashStatus(noteData: any) {
    this.isTrash = !noteData.isTrash;
    this.notesService.trashNote(this.noteDataObj.notesId).subscribe((response: any) => {
      console.log("Note Trashed", response);
      this.changeNoteStatus.emit(response);
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
      this.changeNoteStatus.emit(response);
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
      this.changeNoteStatus.emit(response);
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

  changeNotesColor(newColor: any) {
    this.noteColorInput.noteId = this.noteDataObj.notesId;
    this.noteColorInput.newColor = newColor; 
    this.notesService.changeNoteColor(this.noteColor).subscribe((response: any) => {
      console.log("Note Color Changed Successfully", response);
      this.changeNoteStatus.emit(response);
    })
  }
}
