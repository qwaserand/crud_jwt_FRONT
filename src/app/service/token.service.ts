import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const TOKEN_KEY = 'AuthToken';
//const USERNAME_KEY = 'AuthUserName';
//const AUTHORITIES_KEY = 'AuthAuthorities';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  roles: Array<string> = [];
  
  constructor(
    private router: Router
  ) { }

  public setToken(token: string): void {
    //window.sessionStorage.removeItem(TOKEN_KEY);
    //window.sessionStorage.setItem(TOKEN_KEY, token);
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    //return sessionStorage.getItem(TOKEN_KEY);
    return localStorage.getItem(TOKEN_KEY);
  }

  public isLogged(): boolean {
    if(this.getToken()) {
      return true;
    }
    return false;
  }
  //almacena el nombre de usuario 
  //public setUserName(userName: string): void {
  //  window.sessionStorage.removeItem(USERNAME_KEY);
  //  window.sessionStorage.setItem(USERNAME_KEY, userName);
  //}

  // public getUserName(): string {
  //   return sessionStorage.getItem(USERNAME_KEY);
  // }
  
  public getUserName(): string {
    if (!this.isLogged()) {
      return null;
    }
    const token = this.getToken();
    const payload = token.split('.')[1];
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    const username = values.sub;
    return username;
  }

  public isAdmin(): boolean {
    if (!this.isLogged()) {
      return null;
    }
    const token = this.getToken();
    const payload = token.split('.')[1];
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    const roles = values.roles;
    if(roles.indexOf('ROLE_ADMIN') < 0) {
      return false;
    }
    return true;
  }
  // public setAuthorities(authorities: string[]): void {
  //   window.sessionStorage.removeItem(AUTHORITIES_KEY);
  //   //como es un array (objeto js), lo convierto a texto json
  //   window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  // }

  // public getAuthorities(): string[] {
  //   this.roles = [];
  //   if (sessionStorage.getItem(AUTHORITIES_KEY)) {
  //     JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).forEach((authority: any) => {
  //       this.roles.push(authority.authority);
  //     });
  //   }
  //   return this.roles;
  // }

  public logOut(): void {
    //window.sessionStorage.clear();
    window.localStorage.clear();
    this.router.navigate(['/login']);
  }

}

















