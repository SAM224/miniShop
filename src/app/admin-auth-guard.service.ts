import { Observable } from 'rxjs/Rx';
import { AppUser } from './models/app-user';
import { UserService } from './user.service';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

@Injectable()
export class AdminAuthGuard implements CanActivate{

  constructor( 
    private auth: AuthService, 
    private userService: UserService ) { }

    canActivate = (): Observable<boolean> => 
    this.auth.user$
    .switchMap(user => this.userService.get(user.uid))
    .map(appUser => appUser.isAdmin);

}
