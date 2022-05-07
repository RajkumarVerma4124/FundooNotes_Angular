import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';

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


  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.clear();
    this.router.navigateByUrl('/login')
  }

  changeFormat: boolean = false

  menuClicked() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  recieveSearchMsg(stringData: any) {
    console.log(stringData.target.value);
    this.searchTerm = stringData.target.value;
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
  setSearchActive() {
    this.searchBarActive = !this.searchBarActive;
  }

  setSearchDeactive() {
    this.searchBarActive = false;
  }

  onReload(){
    window.location.reload();
  }
}
