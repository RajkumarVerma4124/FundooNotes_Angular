import { Component, Inject, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UpdateNoteModel } from 'src/app/models/updateNoteModel';
import { NoteService } from 'src/app/services/noteServices/note.service';


@Component({
  selector: 'app-updatenote',
  templateUrl: './updatenote.component.html',
  styleUrls: ['./updatenote.component.scss']
})
export class UpdatenoteComponent implements OnInit {
  note!: UpdateNoteModel;
  valueChanged: boolean = false;
  isPin: boolean = false;
  tempTitleStr: string = '';
  tempDescStr: string = '';
  noteId: any;


  noteType(): UpdateNoteModel {
    return this.note = {
      Title: "",
      Description: "",
      Reminder: "2022-05-20T11:02:38.430Z",
    }
  }

  @Input() noteInput: UpdateNoteModel = this.noteType();

  constructor(public dialogRef: MatDialogRef<UpdatenoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private noteService: NoteService,) { 
    this.noteInput.Title = data.title;
    this.noteInput.Description = data.description;
    this.tempTitleStr = this.noteInput.Title; 
    this.tempDescStr = this.noteInput.Description;
    this.noteId = data.notesId
  }

  ngOnInit(): void {
    // console.log(this.valueChanged)
    // console.log(this.tempTitleStr, this.tempDescStr)
    // console.log(this.noteInput.Title, this.noteInput.Description)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  handlePin() {
    this.isPin = !this.isPin;
  }

  updateNote() {
    if (this.tempDescStr !== this.noteInput.Description || this.tempTitleStr !== this.noteInput.Title) {
      this.noteService.updateNote(this.note, this.noteId).subscribe((response: any) => {
        console.log("Note updated successfully", response.data);
        this.dialogRef.close(response.data);
      }, error => {
        console.log(error);
      });
    }
  }

  detectChange(value: any) {
    this.valueChanged = true;
    // console.log('Value changed--->' + this.valueChanged);
  }

}
