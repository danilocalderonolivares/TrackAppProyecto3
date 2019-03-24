import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAdministrador } from 'app/shared/model/administrador.model';
import { AccountService } from 'app/core';
import { AdministradorService } from './administrador.service';

@Component({
    selector: 'jhi-administrador',
    templateUrl: './administrador.component.html'
})
export class AdministradorComponent implements OnInit, OnDestroy {
    administradors: IAdministrador[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected administradorService: AdministradorService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.administradorService
            .query()
            .pipe(
                filter((res: HttpResponse<IAdministrador[]>) => res.ok),
                map((res: HttpResponse<IAdministrador[]>) => res.body)
            )
            .subscribe(
                (res: IAdministrador[]) => {
                    this.administradors = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAdministradors();
    }

    ngOnDestroy() {
        this.registerChangeInAdministradors();
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAdministrador) {
        return item.id;
    }

    registerChangeInAdministradors() {
        this.eventSubscriber = this.eventManager.subscribe('administradorListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
