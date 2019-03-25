import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISubTarea } from 'app/shared/model/sub-tarea.model';
import { AccountService } from 'app/core';
import { SubTareaService } from './sub-tarea.service';

@Component({
    selector: 'jhi-sub-tarea',
    templateUrl: './sub-tarea.component.html'
})
export class SubTareaComponent implements OnInit, OnDestroy {
    subTareas: ISubTarea[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected subTareaService: SubTareaService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.subTareaService
            .query()
            .pipe(
                filter((res: HttpResponse<ISubTarea[]>) => res.ok),
                map((res: HttpResponse<ISubTarea[]>) => res.body)
            )
            .subscribe(
                (res: ISubTarea[]) => {
                    this.subTareas = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInSubTareas();
    }

    ngOnDestroy() {
        this.registerChangeInSubTareas();
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ISubTarea) {
        return item.id;
    }

    registerChangeInSubTareas() {
        this.eventSubscriber = this.eventManager.subscribe('subTareaListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
