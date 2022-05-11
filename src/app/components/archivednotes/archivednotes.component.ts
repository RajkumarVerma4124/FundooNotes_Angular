import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/noteServices/note.service';

@Component({
  selector: 'app-archivednotes',
  templateUrl: './archivednotes.component.html',
  styleUrls: ['./archivednotes.component.scss']
})
export class ArchivednotesComponent implements OnInit {
  userNoteList: any;
  isArchivedNotes = true;

  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
    this.getArchivedNotesList();
  }

  getArchivedNotesList() {
    this.noteService.getUsersNotes().subscribe((response: any) => {
      console.log("Retrieved All Archived Notes Successfully", response.data);
      this.userNoteList = response.data;
      this.userNoteList.reverse();
      this.userNoteList = this.userNoteList.filter((object: any) => {
        return object.isArchive === true;
      })
      if(this.userNoteList.length != 0){ 
        this.isArchivedNotes = false
      }
      else {
        this.isArchivedNotes = true
      }
    })
  }

  recievedUpdatedData(trashData: any) {
    this.getArchivedNotesList();
  }
}
