import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IRecuperacion } from 'app/shared/model/recuperacion.model';
import { AccountService } from 'app/core';
import { RecuperacionService } from './recuperacion.service';

@Component({
    selector: 'jhi-recuperacion',
    templateUrl: './recuperacion.component.html'
})
export class RecuperacionComponent implements OnInit, OnDestroy {
    recuperacions: IRecuperacion[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected recuperacionService: RecuperacionService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.recuperacionService
            .query()
            .pipe(
                filter((res: HttpResponse<IRecuperacion[]>) => res.ok),
                map((res: HttpResponse<IRecuperacion[]>) => res.body)
            )
            .subscribe(
                (res: IRecuperacion[]) => {
                    this.recuperacions = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInRecuperacions();
    }

    ngOnDestroy() {
        this.registerChangeInRecuperacions();
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IRecuperacion) {
        return item.id;
    }

    registerChangeInRecuperacions() {
        this.eventSubscriber = this.eventManager.subscribe('recuperacionListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
