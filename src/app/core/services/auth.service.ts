import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

// import { tokenNotExpired } from 'angular2-jwt';
import Auth0Lock from 'auth0-lock';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private lock = new Auth0Lock(
    environment.auth0.clientId,
    environment.auth0.domain,
    AUTH_OPTIONS
  );

  constructor(private router: Router) {
    this.lock.on('authenticated', (authResult: any) => {
      console.log(authResult);
      localStorage.setItem('accessToken', authResult.accessToken);
      // TODO: use own storageService
    });

    this.lock.on('authorization_error', error => {
      console.log('something went wrong', error);
    });
  }

  public login(): void {
    this.lock.show();
  }

  public logout(): void {
    this.lock.logout({
      returnTo: environment.auth0.callbackURL
    });
  }

  public isAuthenticated(): void {
    const accessToken = localStorage.getItem('accessToken');
    // TODO: use own storageService
    if (accessToken) {
      this.lock.getUserInfo(accessToken, (error, profile) => {
        if (!error) {
          console.log(profile);
        }
      });
    }
    return;
  }
}

const AUTH_OPTIONS = {
  auth: {
    redirectUrl: environment.auth0.callbackURL,
    responseType: 'token id_token',
    audience: `https://${environment.auth0.domain}/userinfo`,
    params: {
      scope: 'openid profile'
    }
  },
  autoclose: true,
  oidcConformant: true,
  showIcon: false
};
