import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITarea } from 'app/shared/model/tarea.model';
import { AccountService } from 'app/core';
import { TareaService } from './tarea.service';
import { MatTableDataSource } from '@angular/material';
import { fuseAnimations } from '../../../content/scss/animations';

@Component({
    selector: 'jhi-tarea',
    templateUrl: './tarea.component.html',
    animations: fuseAnimations
})
export class TareaComponent implements OnInit, OnDestroy {
    tareas: ITarea[];
    currentAccount: any;
    eventSubscriber: Subscription;
    searchKey: string;
    dataSource: any;
    displayedColumns: string[] = [
        'titulo',
        'descripcion',
        'inicio',
        'fin',
        'activa',
        'completada',
        'empleado',
        'cliente',
        'ubicacion',
        'ruta',
        'buttons'
    ];

    constructor(
        protected tareaService: TareaService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.tareaService
            .query()
            .pipe(
                filter((res: HttpResponse<ITarea[]>) => res.ok),
                map((res: HttpResponse<ITarea[]>) => res.body)
            )
            .subscribe(
                (res: ITarea[]) => {
                    this.tareas = res;
                    this.dataSource = new MatTableDataSource(this.tareas);
                    res.forEach(tarea => {
                        console.log(tarea.inicio);
                    });
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTareas();
    }

    ngOnDestroy() {
        this.registerChangeInTareas();
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITarea) {
        return item.id;
    }

    registerChangeInTareas() {
        this.eventSubscriber = this.eventManager.subscribe('tareaListModification', response => this.loadAll());
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
