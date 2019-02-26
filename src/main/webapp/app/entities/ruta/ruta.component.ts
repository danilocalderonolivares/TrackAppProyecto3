import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IRuta } from 'app/shared/model/ruta.model';
import { AccountService } from 'app/core';
import { RutaService } from './ruta.service';

@Component({
    selector: 'jhi-ruta',
    templateUrl: './ruta.component.html'
})
export class RutaComponent implements OnInit, OnDestroy {
    rutas: IRuta[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected rutaService: RutaService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.rutaService
            .query()
            .pipe(
                filter((res: HttpResponse<IRuta[]>) => res.ok),
                map((res: HttpResponse<IRuta[]>) => res.body)
            )
            .subscribe(
                (res: IRuta[]) => {
                    this.rutas = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInRutas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IRuta) {
        return item.id;
    }

    registerChangeInRutas() {
        this.eventSubscriber = this.eventManager.subscribe('rutaListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
