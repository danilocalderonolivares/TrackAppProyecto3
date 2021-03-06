import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { ITEMS_PER_PAGE } from 'app/shared';
import { AccountService, UserService, User } from 'app/core';
import { UserMgmtDeleteDialogComponent } from 'app/admin';
import { Empleado } from 'app/shared/model/empleado.model';
import { EmpleadoService } from 'app/entities/empleado';
import { UserCustomUser } from 'app/shared/model/user_CustomUser.model';
import { MatTableDataSource } from '@angular/material';
import { fuseAnimations } from '../../../content/scss/animations';

@Component({
    selector: 'jhi-user-mgmt',
    templateUrl: './user-management.component.html',
    animations: fuseAnimations
})
export class UserMgmtComponent implements OnInit, OnDestroy {
    currentAccount: any;
    users: User[];
    userCustomInfo: Empleado[];
    error: any;
    success: any;
    routeData: any;
    links: any;
    totalItems: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    fullUserInfo: UserCustomUser[];
    list: any[] = [];
    dataSource: any;
    searchKey: string;
    displayedColumns: string[] = ['login', 'email', 'nombre', 'apellidos', 'tipo', 'activated', 'authorities', 'buttons'];

    constructor(
        private userService: UserService,
        private alertService: JhiAlertService,
        private accountService: AccountService,
        private parseLinks: JhiParseLinks,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager,
        private modalService: NgbModal,
        private empleadoService: EmpleadoService
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data['pagingParams'].page;
            this.previousPage = data['pagingParams'].page;
            this.reverse = data['pagingParams'].ascending;
            this.predicate = data['pagingParams'].predicate;
        });
    }

    ngOnInit() {
        this.accountService.identity().then(account => {
            this.currentAccount = account;
            this.loadAll();
            this.registerChangeInUsers();
        });
    }

    ngOnDestroy() {
        this.routeData.unsubscribe();
    }

    registerChangeInUsers() {
        this.eventManager.subscribe('userListModification', response => this.loadAll());
    }

    setActive(user, isActivated) {
        user.activated = isActivated;

        this.userService.update(user).subscribe(response => {
            if (response.status === 200) {
                this.error = null;
                this.success = 'OK';
                this.loadAll();
            } else {
                this.success = null;
                this.error = 'ERROR';
            }
        });
    }

    loadAll() {
        this.userService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<User[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpResponse<any>) => this.onError(res.body)
            );
    }

    trackIdentity(index, item: User) {
        return item.id;
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/admin/user-management'], {
            queryParams: {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    deleteUser(user: User) {
        const modalRef = this.modalService.open(UserMgmtDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.user = user;
        modalRef.result.then(
            result => {
                // Left blank intentionally, nothing to do here
            },
            reason => {
                // Left blank intentionally, nothing to do here
            }
        );
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.users = data;
        this.loadCustomUserInfo();
    }

    loadCustomUserInfo() {
        this.empleadoService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe((res: HttpResponse<Empleado[]>) => this.fillUserFullInfo(res), (res: HttpResponse<any>) => this.onError(res.body));
    }

    fillUserFullInfo(res) {
        this.fullUserInfo = [];
        this.userCustomInfo = res.body;

        for (const user of this.users) {
            const customUser = this.userCustomInfo.find(currentUser => currentUser.idUsuarioRelacion === user.id);
            if (customUser !== null) {
                this.fullUserInfo.push(new UserCustomUser(user, customUser));
            }
        }

        this.dataSource = new MatTableDataSource(this.fullUserInfo);
        this.fillSortedTable();
    }

    fillSortedTable() {
        this.dataSource.filterPredicate = (data, filter) => {
            const dataStr =
                data.user.login.toLowerCase() +
                data.user.email.toLowerCase() +
                data.user.authorities[0].toLowerCase() +
                data.empleado.nombre.toLowerCase() +
                data.empleado.apellidos.toLowerCase() +
                data.empleado.tipo.nombreTipo.toLowerCase();
            return dataStr.indexOf(filter) !== -1;
        };
    }

    private onError(error) {
        this.alertService.error(error.error, error.message, null);
    }

    /*applyFilter() {
        this.dataSource.filter = this.searchKey.trim().toLowerCase();
    }*/

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.toLowerCase();
    }

    onSearchClear() {
        this.searchKey = '';
        this.applyFilter('');
    }

    isNotMyself(user: UserCustomUser) {
        if (this.currentAccount.id !== user.user.id) {
            return true;
        } else {
            return false;
        }
    }
}
