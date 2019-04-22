import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IHorario } from 'app/shared/model/horario.model';
import { AccountService } from 'app/core';
import { HorarioService } from './horario.service';
import { MatTableDataSource } from '@angular/material';
import { fuseAnimations } from '../../../content/scss/animations';

@Component({
    selector: 'jhi-horario',
    templateUrl: './horario.component.html',
    animations: fuseAnimations
})
export class HorarioComponent implements OnInit, OnDestroy {
    horarios: IHorario[];
    currentAccount: any;
    eventSubscriber: Subscription;
    displayedColumns: string[] = [
        'nombre',
        'lunesI',
        'lunesF',
        'martesI',
        'martesF',
        'miercolesI',
        'miercolesF',
        'juevesI',
        'juevesF',
        'viernesI',
        'viernesF',
        'sabadoI',
        'sabadoF',
        'domingoI',
        'domingoF',
        'buttons'
    ];
    dataSource: any;
    searchKey: string;

    constructor(
        protected horarioService: HorarioService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.horarioService
            .query()
            .pipe(
                filter((res: HttpResponse<IHorario[]>) => res.ok),
                map((res: HttpResponse<IHorario[]>) => res.body)
            )
            .subscribe(
                (res: IHorario[]) => {
                    this.horarios = res;
                    this.dataSource = new MatTableDataSource(this.horarios);
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInHorarios();
    }

    ngOnDestroy() {
        this.registerChangeInHorarios();
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IHorario) {
        return item.id;
    }

    registerChangeInHorarios() {
        this.eventSubscriber = this.eventManager.subscribe('horarioListModification', response => this.loadAll());
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
