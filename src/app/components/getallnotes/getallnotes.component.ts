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
  constructor(private noteService: NoteService) {
  }

  ngOnInit(): void {
    this.getUsersNotes();
  }

  handlePin() {
    this.isPin = !this.isPin;
  }

  getUsersNotes() {
    this.noteService.getUsersNotes().subscribe((response: any) => {
      console.log("Got Users Notes Successfully", response.data);
      this.userNoteList = response.data;
      this.userNoteList.reverse();
      this.userNoteList = this.userNoteList.filter((object: any) => {
        // console.log(object)
        return object.isTrash === false && object.isArchive === false;
      })
    });
  }

  recieveAddedNote(newnote:any){
    console.log(newnote);
    this.userNoteList.reverse();
    this.userNoteList.push(newnote);
    this.userNoteList.reverse();
  }

  recievedUpdatedData(note: any) {
    console.log(note.data);
    this.getUsersNotes();
  }
}