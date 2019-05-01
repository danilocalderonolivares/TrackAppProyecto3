import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { AccountService, LoginModalService, LoginService } from 'app/core';
import { ProfileService } from 'app/layouts';
import { Router } from '@angular/router';
import { VERSION } from 'app/app.constants';

@Component({
    selector: 'jhi-headernav',
    templateUrl: './headernav.component.html',
    styles: []
})
export class HeadernavComponent implements OnInit {
    @Output() sidenavToggle = new EventEmitter<void>();
    inProduction: boolean;
    isNavbarCollapsed: boolean;
    swaggerEnabled: boolean;
    modalRef: NgbModalRef;
    version: string;
    salir = faSignOutAlt;
    entrat = faSignInAlt;
    isMenuOpen = true;
    contentMargin = 240;
    usuarioInfo: any = '';

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
        this.usuarioInfo = JSON.parse(sessionStorage.getItem('user'));
        this.profileService.getProfileInfo().then(profileInfo => {
            this.inProduction = profileInfo.inProduction;
            this.swaggerEnabled = profileInfo.swaggerEnabled;
        });
        // this.obtenerDatosUsuarios();
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

    onToolbarMenuToggle() {
        this.sidenavToggle.emit();
    }

    obtenerDatosUsuarios() {
        this.usuarioInfo = JSON.parse(sessionStorage.getItem('user'));
    }
}
