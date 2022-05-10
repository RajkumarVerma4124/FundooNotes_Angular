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
    this.getUsersNotes();
  }

  ngOnInit(): void {
  }

  handlePin() {
    this.isPin = !this.isPin;
  }

  getUsersNotes() {
    this.noteService.getUsersNotes().subscribe((response: any) => {
      console.log("Got Users Notes Successfully", response.data);
      this.userNoteList = response.data;
      this.userNoteList.reverse();
    });
  }

  recieveAddedNote(newnote:any){
    console.log(newnote);
    this.userNoteList.push(newnote);
    this.userNoteList.reverse();
  }
}