import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Logger } from '@app/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { AuthConfigService } from './auth.config.service';
const log = new Logger('AuthGuaard');
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authConfigService: AuthConfigService,
    private oauthService: OAuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!this.authConfigService.decodedAccessToken) this.authConfigService.initAuth();

      var hasIdToken = this.oauthService.hasValidIdToken();
      var hasAccessToken = this.oauthService.hasValidAccessToken();

      if (hasIdToken && hasAccessToken) return resolve(true);

      return reject(false);
    });
  }
}
