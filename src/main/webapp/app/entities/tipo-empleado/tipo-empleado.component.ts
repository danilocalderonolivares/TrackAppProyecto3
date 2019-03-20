import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITipoEmpleado } from 'app/shared/model/tipo-empleado.model';
import { AccountService } from 'app/core';
import { TipoEmpleadoService } from './tipo-empleado.service';

@Component({
    selector: 'jhi-tipo-empleado',
    templateUrl: './tipo-empleado.component.html'
})
export class TipoEmpleadoComponent implements OnInit, OnDestroy {
    tipoEmpleados: ITipoEmpleado[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected tipoEmpleadoService: TipoEmpleadoService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.tipoEmpleadoService
            .query()
            .pipe(
                filter((res: HttpResponse<ITipoEmpleado[]>) => res.ok),
                map((res: HttpResponse<ITipoEmpleado[]>) => res.body)
            )
            .subscribe(
                (res: ITipoEmpleado[]) => {
                    this.tipoEmpleados = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTipoEmpleados();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITipoEmpleado) {
        return item.id;
    }

    registerChangeInTipoEmpleados() {
        this.eventSubscriber = this.eventManager.subscribe('tipoEmpleadoListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
