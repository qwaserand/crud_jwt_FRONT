import { Component, OnInit } from '@angular/core';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isLogged = false;
  isAdmin = false;
  
  constructor(private tokenService: TokenService) { }

  ngOnInit() {
    this.isLogged = this.tokenService.isLogged();
    this.isAdmin = this.tokenService.isAdmin();
    // if(this.tokenService.getToken()) {
    //   this.isLogged = true;
    // } else {
    //   this.isLogged = false;
    // }
  }

  onLogOut(): void {
    this.tokenService.logOut();
    //window.location.reload();
  }

}
