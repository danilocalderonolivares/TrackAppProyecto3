import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ILog } from 'app/shared/model/log.model';
import { AccountService } from 'app/core';
import { LogService } from './log.service';

@Component({
    selector: 'jhi-log',
    templateUrl: './log.component.html'
})
export class LogComponent implements OnInit, OnDestroy {
    logs: ILog[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected logService: LogService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.logService
            .query()
            .pipe(
                filter((res: HttpResponse<ILog[]>) => res.ok),
                map((res: HttpResponse<ILog[]>) => res.body)
            )
            .subscribe(
                (res: ILog[]) => {
                    this.logs = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInLogs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ILog) {
        return item.id;
    }

    registerChangeInLogs() {
        this.eventSubscriber = this.eventManager.subscribe('logListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
