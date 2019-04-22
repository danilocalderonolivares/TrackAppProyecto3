import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { VERSION } from 'app/app.constants';
import { AccountService, LoginModalService, LoginService } from 'app/core';
import { ProfileService } from 'app/layouts/profiles/profile.service';
import { faSignOutAlt, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'jhi-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.scss']
})
export class NavbarComponent implements OnInit {
    @Output() sidenavToggle = new EventEmitter<void>();
    inProduction: boolean;
    isNavbarCollapsed: boolean;
    languages: any[];
    swaggerEnabled: boolean;
    modalRef: NgbModalRef;
    version: string;
    salir = faSignOutAlt;
    entrat = faSignInAlt;
    isMenuOpen = true;
    contentMargin = 240;
    constructor(
        private loginService: LoginService,
        private accountService: AccountService,
        private loginModalService: LoginModalService,
        private profileService: ProfileService,
        private router: Router
    ) {
        this.version = VERSION ? 'v' + VERSION : '';
        this.isNavbarCollapsed = true;
    }

    ngOnInit() {
        this.profileService.getProfileInfo().then(profileInfo => {
            this.inProduction = profileInfo.inProduction;
            this.swaggerEnabled = profileInfo.swaggerEnabled;
        });
    }

    collapseNavbar() {
        this.isNavbarCollapsed = true;
    }

    isAuthenticated() {
        return this.accountService.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
        // this.router.navigate(['/login']);
    }

    logout() {
        this.collapseNavbar();
        this.loginService.logout();
        this.router.navigate(['']);
    }

    // toggleNavbar() {
    //     this.isNavbarCollapsed = !this.isNavbarCollapsed;
    // }
    //
    // getImageUrl() {
    //     return this.isAuthenticated() ? this.accountService.getImageUrl() : null;
    // }
    onToolbarMenuToggle() {
        this.sidenavToggle.emit();
    }
}
