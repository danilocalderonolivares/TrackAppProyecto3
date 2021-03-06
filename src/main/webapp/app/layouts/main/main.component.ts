import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot, NavigationEnd, NavigationError } from '@angular/router';

import { Title } from '@angular/platform-browser';
import { AccountService } from 'app/core';
import {
    faLocationArrow,
    faUserFriends,
    faRoute,
    faCalendarWeek,
    faCommentDots,
    faUsersCog,
    faUsers
} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'jhi-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.scss']
})
export class JhiMainComponent implements OnInit {
    location = faLocationArrow;
    clients = faUserFriends;
    route = faRoute;
    schedule = faCalendarWeek;
    chatIcono = faCommentDots;
    usersIcon = faUsersCog;
    userType = faUsers;
    usuarioInfo :any;
    constructor(private titleService: Title, private router: Router, private accountService: AccountService) {}

    private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
        let title: string = routeSnapshot.data && routeSnapshot.data['pageTitle'] ? routeSnapshot.data['pageTitle'] : 'gpsApp';
        if (routeSnapshot.firstChild) {
            title = this.getPageTitle(routeSnapshot.firstChild) || title;
        }
        return title;
    }

    ngOnInit() {
        this.obtenerDatosUsuarios();
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.titleService.setTitle(this.getPageTitle(this.router.routerState.snapshot.root));
            }
            if (event instanceof NavigationError && event.error.status === 404) {
                this.router.navigate(['/404']);
            }
        });
    }
    isAuthenticated() {
        return this.accountService.isAuthenticated();
    }
    obtenerDatosUsuarios(){
        this.usuarioInfo = JSON.parse(sessionStorage.getItem('user'));
    }
}
