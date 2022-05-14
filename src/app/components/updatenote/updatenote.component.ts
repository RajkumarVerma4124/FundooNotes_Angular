import { Component, Inject, OnInit, Input } from '@angular/core';
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
  imageUrl: any = [];
  color: string = ''
  iscolorchange: boolean = false
  
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
    this.data.isPinned = !this.data.isPinned;
    this.noteService.pinNote(this.data.notesId).subscribe((response: any) => {
      console.log("Note Pin status changed", response.data);
    })
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
    console.log('Value changed--->' + this.valueChanged);
  }

  refreshUpdatedNoteData(newNoteData: any) {
    if(newNoteData.success === true){ 
      this.data.imageList.splice(0, 1);
      console.log("After updation", this.data)
    }
    else if (newNoteData?.[0] != null) {
      console.log(this.data)
      this.data.imageList.push(newNoteData?.[0])
      console.log("After updation", this.data)
    }
    else {
      this.data.color = newNoteData.color
    }
  }
}
