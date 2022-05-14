import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { NoteService } from 'src/app/services/noteServices/note.service';
import { CollabService } from 'src/app/services/collabServices/collab.service';
import { NoteColorModel } from 'src/app/models/noteColorModel';
import { MatDialog } from '@angular/material/dialog';
import { CollabnotesComponent } from '../collabnotes/collabnotes.component';

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
  @Output() updateImageAndColor = new EventEmitter<any>();
  colorsPaletteArr = [
                        { color: "white", name: "Default" }, 
                        { color: "#f28b82", name: "Red" }, 
                        { color: "#fbbc04", name: "Orange" }, 
                        { color: "#fff475", name: "Yellow" }, 
                        { color: "#ccff90", name: "Green" }, 
                        { color: "#a7ffeb", name: "Teal" },
                        { color: "#cbf0f8", name: "Blue" }, 
                        { color: "#aecbfa", name: "Dark blue" }, 
                        { color: "#d7aefb", name: "Purple" }, 
                        { color: "#fdcfe8", name: "Pink" }, 
                        { color: "#e6c9a8", name: "Brown" }, 
                        { color: "#e8eaed", name: "Grey" }
                     ];

  noteColor!: NoteColorModel;

  noteType(): NoteColorModel {
    return this.noteColor = {
      noteId: "",
      newColor: "",
    }
  }

  @Input() noteColorInput: NoteColorModel = this.noteType();

  constructor(private notesService: NoteService, private snackBar: MatSnackBar, 
    private collabService: CollabService, public dialog: MatDialog) {
   }

  ngOnInit() {
    // this.isArchive = this.noteDataObj.isArchive;
    // this.isTrash = this.noteDataObj.isTrash;
  }

  ngOnChanges() {
    this.isArchive = this.noteDataObj.isArchive;
    this.isTrash = this.noteDataObj.isTrash;
  }

  changeTrashStatus(noteData: any) {
    if (typeof (noteData.notesId) !== 'undefined'){ 
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
      })
    }
    else{ 
      noteData.IsTrash = !noteData.IsTrash;
      this.changeNoteStatus.emit(noteData);
    }
     
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
    if (typeof (noteData.notesId) !== 'undefined'){
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
    else{
      this.isArchive = !this.isArchive;
      noteData.IsArchive = !noteData.IsArchive;
      this.changeNoteStatus.emit(noteData);
    }
    
  }

  changeNotesColor(newColor: any) { 
    if (typeof (this.noteDataObj.notesId) !== 'undefined') {
      this.noteColorInput.noteId = this.noteDataObj.notesId;
      this.noteColorInput.newColor = newColor;
      this.noteDataObj.color = newColor;
      this.notesService.changeNoteColor(this.noteColor).subscribe((response: any) => {
        console.log("Note Color Changed Successfully", response);
        this.changeNoteStatus.emit(response);
        this.updateImageAndColor.emit(this.noteDataObj);
      })
    }
    else{
      this.noteDataObj.Color = newColor;
      this.changeNoteStatus.emit(this.noteDataObj);
    }
  }

  onSelectFile(event: any){
    if (event.target.files && event.target.files[0]) {
      let image = event.target.files[0];
      this.addNotesImage(image);
    }
  }
  
  addNotesImage(imageData: any) {
    if (typeof (this.noteDataObj.notesId) !== 'undefined') {
      const imageForm = new FormData();
      imageForm.append('image', imageData);
      this.notesService.addNoteImage(this.noteDataObj.notesId, imageForm).subscribe((response: any) => {
        console.log("Add Image Successfully", response.data[0]);
        this.changeNoteStatus.emit(response.data[0]);
        this.updateImageAndColor.emit(response.data);
      })
    }
    else{ 
      this.noteDataObj.ImagePaths = imageData;
      this.changeNoteStatus.emit(this.noteDataObj);
    }
  }

  deleteNotesImage(noteData: any) {
    if (typeof (this.noteDataObj.notesId) !== 'undefined') {
      let imageId = noteData.imageList[0].imageId
      console.log(imageId)
      this.notesService.deleteNoteImage(this.noteDataObj.notesId, imageId).subscribe((response: any) => {
        console.log("Delete Image Successfully", response);
        this.changeNoteStatus.emit(response);
        this.updateImageAndColor.emit(response);
      })
    }
  }

  addCollaborator(noteData: any) {
      const dialogRef = this.dialog.open(CollabnotesComponent, {
        width: '600Px',
        maxHeight: '650Px',
        data: noteData,
      });
      dialogRef.afterClosed().subscribe((result: any) => {
        console.log('The collab dialog was closed:',result);
        this.changeNoteStatus.emit(result);
      });
  }
}
