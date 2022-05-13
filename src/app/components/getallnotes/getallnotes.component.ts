import { Component, Input, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/noteServices/note.service';
import { NoteModel } from 'src/app/models/notesModel';

@Component({
  selector: 'app-getallnotes',
  templateUrl: './getallnotes.component.html',
  styleUrls: ['./getallnotes.component.scss']
})
export class GetallnotesComponent implements OnInit {
  isPin = false;
  userNoteList: any;
  userotherNoteList: any;
  isOtherNoteExist: boolean = false;
  isotherNotesExists: boolean = false;
  constructor(private noteService: NoteService) {
  }

  ngOnInit(): void {
    this.getUsersNotes();
  }

  getUsersNotes() {
    this.noteService.getUsersNotes().subscribe((response: any) => {
      console.log("Got Users Notes Successfully", response);
      this.userNoteList = response.data;
      this.userNoteList.reverse();
      this.userotherNoteList = response.data;
      // this.userotherNoteList.reverse();
      this.userNoteList = this.userNoteList.filter((userNote: any) => {
        return userNote.isTrash === false && userNote.isArchive === false && userNote.isPinned == true;
      })
      console.log(this.userNoteList)
      this.userotherNoteList = this.userotherNoteList.filter((userNote: any) => {
        return userNote.isTrash === false && userNote.isArchive === false && userNote.isPinned == false;
      })
      if(this.userotherNoteList.length != 0) {
        this.isotherNotesExists == true;
      }
      console.log(this.userotherNoteList)
    });
  }

  recieveAddedNote(newnote: any) {
    console.log(newnote);
    if(newnote.isPinned !== false) {
      this.userNoteList.reverse();
      this.userNoteList.push(newnote);
      this.userNoteList.reverse();
    }
    else{
      this.userotherNoteList.reverse();
      this.userotherNoteList.push(newnote);
      this.userotherNoteList.reverse();
    }

  }

  recievedUpdatedData(note: any) {
    setTimeout(() => {
      this.getUsersNotes();
    }, 50);
  }
}