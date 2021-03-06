import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICliente } from 'app/shared/model/cliente.model';
import { AccountService } from 'app/core';
import { ClienteService } from './cliente.service';
import { fuseAnimations } from '../../../content/scss/animations';
import { MatTableDataSource } from '@angular/material';

@Component({
    selector: 'jhi-cliente',
    templateUrl: './cliente.component.html',
    animations: fuseAnimations
})
export class ClienteComponent implements OnInit, OnDestroy {
    clientes: ICliente[];
    clientesBorradoLogico: ICliente[];
    displayedColumns: string[] = ['nombre', 'cedula', 'correo', 'direccion', 'buttons'];
    currentAccount: any;
    eventSubscriber: Subscription;
    dataSource: any;
    // Esta variable se necesita para hacer la busqueda en datatable
    searchKey: string;
    constructor(
        protected clienteService: ClienteService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.clienteService
            .query()
            .pipe(
                filter((res: HttpResponse<ICliente[]>) => res.ok),
                map((res: HttpResponse<ICliente[]>) => res.body)
            )
            .subscribe(
                (res: ICliente[]) => {
                    this.clientes = res;
                    this.dataSource = new MatTableDataSource(this.clientes);
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();

        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInClientes();
    }

    ngOnDestroy() {
        this.registerChangeInClientes();
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICliente) {
        return item.id;
    }

    registerChangeInClientes() {
        this.eventSubscriber = this.eventManager.subscribe('clienteListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
    onSearchClear() {
        this.searchKey = '';
        this.applyFilter();
    }

    applyFilter() {
        this.dataSource.filter = this.searchKey.trim().toLowerCase();
    }
}
