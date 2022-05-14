import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CollabService } from 'src/app/services/collabServices/collab.service';
import { CollabUserModel } from 'src/app/models/collabModel';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-collabnotes',
  templateUrl: './collabnotes.component.html',
  styleUrls: ['./collabnotes.component.scss']
})
export class CollabnotesComponent implements OnInit {
  customStyle = {
    backgroundColor: "#ffffff",
    border: "1px solid rgba(0,0,0,.6)",
    borderRadius: "50%",
    color: "#202124",
    cursor: "pointer",
  };

  ownerName: any = "";
  collabUserName: any = "";
  ownerEmail: any = "";
  notesId: any;
  collabUsersData: any;
  tempCollabUsersList: any;
  searchEmail: string = "";
  isSearchActive: boolean = false;
  snackBarRef: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  collabUser!: CollabUserModel;

  collabType(): CollabUserModel {
    return this.collabUser = {
      noteId: "",
      collabEmail: "",
    }
  }

  @Input() collabUserInput: CollabUserModel = this.collabType();

  constructor(public dialogRef: MatDialogRef<CollabnotesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private collabService: CollabService, 
    private snackBar: MatSnackBar) { 
      this.notesId = data.notesId;
    }

  ngOnInit(): void {

    console.log(this.notesId);
    this.getCollabUsers();
  }

  addCollabEmail(collabEmail: any) {
    console.log(collabEmail);
    this.collabUserInput.noteId = this.notesId;
    this.collabUserInput.collabEmail = collabEmail;
    this.collabService.addCollabUser(this.collabUserInput).subscribe((response: any) => {
      console.log("Added Collab Email Id Sucessfully : ", response);
      this.snackBar.open(response.message, 'Success', {
        duration: 4000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      })
      this.getCollabUsers();
    }, error => {
      console.log(error);
      this.snackBar.open(error.error.message, 'Failed', {
        duration: 4000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      })
    });
  }

  recieveEmailId(event: any){ 
    this.searchEmail = event.target.value;
    this.isSearchActive = true;
    if (this.searchEmail.length == 0) {
      this.diableAddCollab();
    }
  }

  diableAddCollab() {
    this.searchEmail = "";
    this.isSearchActive = false;
  }

  getCollabUsers() {
    this.collabService.getCollabUser(this.notesId).subscribe((response: any) => {
        console.log(response);
      this.collabUsersData = response.data;
      this.tempCollabUsersList = response.data;
      this.ownerName = `${this.collabUsersData[0]?.firstName} ${this.collabUsersData[0]?.lastName}`;
      this.ownerEmail = `${this.collabUsersData[0]?.collabEmail}`;
      this.collabUsersData = this.collabUsersData.slice(1);
      console.log(this.ownerName);
      console.log("collaborators list:", this.collabUsersData);
    }, error => {
      console.log(error);
      this.snackBar.open(error.error.message, 'Failed', {
        duration: 4000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      })
    });
  }

  removeCollabUsers(collabId: any) {
    console.log(collabId);
    this.collabService.deleteCollabUser(collabId, this.notesId).subscribe((response: any) => {
      this.snackBar.open(response.message, 'Success', {
        duration: 4000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      })
      this.getCollabUsers();
    }, error => {
      console.log(error);
      this.snackBar.open(error.error.message, 'Failed', {
        duration: 4000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      })
    });
  }

  collabData(collabDataList: any){ 
    console.log(collabDataList)
    this.dialogRef.close(collabDataList)
  }
}
