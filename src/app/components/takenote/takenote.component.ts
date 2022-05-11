import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NoteService } from 'src/app/services/noteServices/note.service';
import { NoteModel } from 'src/app/models/notesModel';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-takenote',
  templateUrl: './takenote.component.html',
  styleUrls: ['./takenote.component.scss']
})
export class TakenoteComponent implements OnInit {
  isExpand = false;
  isPin = false;
  isUndoDisabled = true;
  isRedoDisabled = true;
  onTitle = false;
  onDesc = false;
  tempTitleStr: string = '';
  tempDescStr: string = '';
  noteModel!: NoteModel;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private noteService: NoteService, private snackBar: MatSnackBar,) { }

  noteType(): NoteModel {
    return this.noteModel = {
      Title: "",
      Description: "",
      Color: "white",
      Reminder: "2022-05-20T11:02:38.430Z",
      ImagePaths: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg",
      IsArchive: false,
      IsPinned: false,
      IsTrash: false
    }
  }

  @Input() noteInput: NoteModel = this.noteType();
  @Output() addNoteEvent = new EventEmitter<any>();

  ngOnInit(): void {
  }

  noteStatus() {
    return this.isExpand === true ? (this.isExpand = false) : (this.isExpand = true);
  }

  checkTitle(stringData: any) { 
    this.noteInput.Title = stringData.target.value;
    this.tempTitleStr = stringData.target.value;
    this.isUndoDisabled = false;
    this.isRedoDisabled = true;
    if (this.noteInput.Title.length === 0) {
      this.isUndoDisabled = true;
      this.isRedoDisabled = false;
    }
  }

  checkDescription(stringData: any) {
    this.noteInput.Description = stringData.target.value;
    this.tempDescStr = stringData.target.value;
    this.isUndoDisabled = false;
    this.isRedoDisabled = true;
    if (this.noteInput.Description.length === 0) {
      this.isUndoDisabled = true
      this.isRedoDisabled = false;
    }
  }

  addNote() {
    this.isExpand = false;
    if (this.noteInput.Title != '' || this.noteInput.Description != '') {
      this.noteService.createNote(this.noteInput).subscribe((response: any) => {
        console.log("Notes Created successfull", response);
        this.snackBar.open('Note Created', '', {
          duration: 4000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        })
        this.addNoteEvent.emit(response.data.notesDetails);
        this.noteInput.Title = "";
        this.noteInput.Description = "";
        this.tempTitleStr= "";
        this.tempDescStr="";
      }, error => {
        console.log(error);
        this.snackBar.open(error.error.message, '', {
          duration: 4000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        })
      });
    }
  }

  handlePin() {
    this.noteInput.IsPinned = !this.noteInput.IsPinned;
  }

  onTitleClick() {
    this.onTitle = true;
    this.onDesc = false;
  }

  onDescriptionClick() {
    this.onDesc = true;
    this.onTitle = false;
  }

  handleUndoDisable() {
    this.isUndoDisabled = true;
    this.isRedoDisabled = false;
    if (this.onTitle === true) {
      this.noteInput.Title = "";

    }
    else if (this.onDesc === true) {
      this.noteInput.Description = ""
    }
  }

  handleRedoDisable() {
    this.isRedoDisabled = true;
    this.isUndoDisabled = false;
    console.log(this.onTitle, this.onDesc)
    if(this.onTitle === true)
    {
      this.noteInput.Title = this.tempTitleStr;

    }
    else if(this.onDesc === true){
      this.noteInput.Description = this.tempDescStr;
    }
  }
}

