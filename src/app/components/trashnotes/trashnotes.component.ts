import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/noteServices/note.service';

@Component({
  selector: 'app-trashnotes',
  templateUrl: './trashnotes.component.html',
  styleUrls: ['./trashnotes.component.scss']
})
export class TrashnotesComponent implements OnInit {
  userNoteList: any;

  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
    this.getTrashNotesList();
  }

  getTrashNotesList() {
    this.noteService.getUsersNotes().subscribe((response: any) => {
      console.log("Retrieved All Trash Notes Successfully", response.data);
      this.userNoteList = response.data;
      this.userNoteList.reverse();
      this.userNoteList = this.userNoteList.filter((object: any) => {
        console.log(object)
        return object.isTrash === true;
      })
      // console.log(this.userNoteList);
    })
  }

  recievedUpdatedData(trashData: any) {
    // console.log(trashData)
    this.getTrashNotesList();
  }

}
