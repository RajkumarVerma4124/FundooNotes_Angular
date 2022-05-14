import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { UpdatenoteComponent } from '../updatenote/updatenote.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { NoteService } from 'src/app/services/noteServices/note.service';
import { CollabService } from 'src/app/services/collabServices/collab.service';
import { DataService } from '../../services/dataServices/data.service'

@Component({
  selector: 'app-displaynote',
  templateUrl: './displaynote.component.html',
  styleUrls: ['./displaynote.component.scss']
})
export class DisplaynoteComponent implements OnInit {
  customStyle = {
    backgroundColor: "transparent",
    border: "1px solid rgba(0,0,0,.6)",
    borderRadius: "50%",
    color: "#202124",
    cursor: "pointer",
  };
  
  isPin = false;
  snackBarRef: any;
  searchString: any;
  collabUsers: any;
  collabUsersList: any;
  isIconVisible: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  @Input() userNoteList: any;
  @Output() updateNoteEvent = new EventEmitter<any>();

  constructor(public dialog: MatDialog, private notesService: NoteService, 
    private snackBar: MatSnackBar, private dataService: DataService, private collabService: CollabService) { 
  }

  ngOnInit(): void {
    this.dataService.recievedData.subscribe((response: any) => {
      console.log("Data Recieved", response);
      this.searchString = response;
      })
    this.getAllCollabNotes();
  }

  openDialog(noteData: any) {
    if(noteData.isTrash === true)
    { 
      this.snackBar.open('Can’t edit in Recycle Bin', 'Failed', {
        duration: 4000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      })
    }
    else{
      const dialogRef = this.dialog.open(UpdatenoteComponent, {
        width: '650Px',
        maxHeight: '600Px',
        data: noteData,
      });

      dialogRef.afterClosed().subscribe(result => {
        // console.log('The dialog was closed:' +result);
        this.refreshUpdatedNoteData(result)
      });
    }
  }

  handlePin(noteData: any) {
    noteData.isPinned = !noteData.isPinned
    this.notesService.pinNote(noteData.notesId).subscribe((response: any) => {
      console.log("Note Pin status changed", response.data);
    })
    this.refreshUpdatedNoteData(noteData)
  }

  refreshUpdatedNoteData(event: any) {
    console.log(event)
    console.log(event?.length >= 0);
    if (event !== true ){
      console.log(event)
      this.updateNoteEvent.emit(event);
     }
     else if(event?.length >= 0) {
      this.getAllCollabNotes();
      this.updateNoteEvent.emit(event);
    }
  }

  noteClicked(){
    this.isIconVisible = !this.isIconVisible
  }

  getAllCollabNotes(){
    this.collabService.getAllCollabUser().subscribe((response: any) => {
          console.log("Got All Collab User", response.data);
          this.collabUsersList = response.data;
        }, error => {
          console.log(error);
          this.snackBar.open(error.error.message, 'Add Some ', {
            duration: 4000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          })
        });
  }
}
