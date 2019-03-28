import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IUbicacion } from 'app/shared/model/ubicacion.model';
import { AccountService } from 'app/core';
import { UbicacionService } from './ubicacion.service';

@Component({
    selector: 'jhi-ubicacion',
    templateUrl: './ubicacion.component.html'
})
export class UbicacionComponent implements OnInit, OnDestroy {
    ubicacions: IUbicacion[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected ubicacionService: UbicacionService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.ubicacionService
            .query()
            .pipe(
                filter((res: HttpResponse<IUbicacion[]>) => res.ok),
                map((res: HttpResponse<IUbicacion[]>) => res.body)
            )
            .subscribe(
                (res: IUbicacion[]) => {
                    this.ubicacions = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInUbicacions();
    }

    ngOnDestroy() {
        this.registerChangeInUbicacions();
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IUbicacion) {
        return item.id;
    }

    registerChangeInUbicacions() {
        this.eventSubscriber = this.eventManager.subscribe('ubicacionListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
