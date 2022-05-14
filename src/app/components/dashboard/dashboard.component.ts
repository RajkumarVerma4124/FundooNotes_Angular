import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { DataService } from '../../services/dataServices/data.service'
import { NoteService } from '../../services/noteServices/note.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy {
  customStyle = {
    backgroundColor: "#ffffff",
    border: "1px solid #7e7e7e",
    borderRadius: "50%",
    color: "#7e7e7e",
    cursor: "pointer",
  };

  mobileQuery: MediaQueryList;
  searchActive: boolean = false;
  searchTerm: string = "";
  searchBarActive: boolean = false;
  isMenuOpen: boolean = false;
  isViewChange: boolean = true;
  isBackIconClicked: boolean = false;
  isSearchIconClicked: boolean = false;
  firstName: any;
  lastName: any;
  userName: any;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private router: Router, 
    private dataService: DataService, private noteService: NoteService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.firstName = localStorage.getItem('FirstName');
    this.lastName = localStorage.getItem('LastName');
    this.userName =  this.firstName +" "+this.lastName;
    console.log(this.userName);
  }
  
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("FirstName");
    localStorage.removeItem("LastName");
    localStorage.removeItem("Email");
    localStorage.clear();
    this.router.navigateByUrl('/login');
    window.location.reload();
  }

  menuClicked() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  recieveSearchNote(noteString: any) {
    console.log(noteString.target.value);
    this.searchTerm = noteString.target.value;
    this.dataService.SendData(this.searchTerm);
    this.searchActive = true;
    if(this.searchTerm.length == 0)
    {
      this.clickCross();
    }
  }

  clickCross() {
    this.searchTerm="";
    this.searchActive = false;
  }

  clickBackIcon() {
    this.searchTerm = "";
    this.searchActive = false;
    this.isBackIconClicked = !this.isBackIconClicked;
    var element = <HTMLElement>document.getElementById("searchBox");
    element.setAttribute("style", "display:none;");
    var elementIcon = <HTMLElement>document.getElementById("searchIcon");
    elementIcon.setAttribute("style", "display:inline-block;");
  }
  
  searchIconClicked() {
    this.isSearchIconClicked= !this.isSearchIconClicked
    var element =<HTMLElement>  document.getElementById("searchBox");
    element.setAttribute("style", "display:inline-block;");
    var elementIcon = <HTMLElement>document.getElementById("searchIcon");
    elementIcon.setAttribute("style", "display:none;");
    var crossIcon = <HTMLElement>document.getElementById("iconcross");
    crossIcon.setAttribute("style", "margin-left:-20px;");
  }

  setSearchActive() {
    this.searchBarActive = !this.searchBarActive;
  }

  setSearchDeactive() {
    this.searchBarActive = false;
  }

  viewChange(){
    this.isViewChange = !this.isViewChange;
  }

  onReload(){
    window.location.reload();
  }
}
