import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/noteServices/note.service';

@Component({
  selector: 'app-archivednotes',
  templateUrl: './archivednotes.component.html',
  styleUrls: ['./archivednotes.component.scss']
})
export class ArchivednotesComponent implements OnInit {
  userNoteList: any;

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
        console.log(object)
        return object.isArchive === true;
      })
      // console.log(this.userNoteList);
    })
  }

  recievedUpdatedData(trashData: any) {
    // console.log(trashData)
    this.getArchivedNotesList();
  }


}
