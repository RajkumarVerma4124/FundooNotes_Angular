import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/noteServices/note.service';

@Component({
  selector: 'app-trashnotes',
  templateUrl: './trashnotes.component.html',
  styleUrls: ['./trashnotes.component.scss']
})
export class TrashnotesComponent implements OnInit {
  userNoteList: any;
  isTrashNotes = true;

  constructor(private noteService: NoteService) {

   }

  ngOnInit(): void {
    this.getTrashNotesList();
  }

  getTrashNotesList() {
    this.noteService.getUsersNotes().subscribe((response: any) => {
      console.log("Retrieved All Trash Notes Successfully", response.data);
      this.userNoteList = response.data;
      this.userNoteList.reverse();
      this.userNoteList = this.userNoteList.filter((userNote: any) => {
        return userNote.isTrash === true;
      })
      if (this.userNoteList.length != 0) {
        this.isTrashNotes = false
      }
      else {
        this.isTrashNotes = true
      }
    })
  }

  recievedUpdatedData(trashData: any) {
    this.getTrashNotesList();
  }

}
