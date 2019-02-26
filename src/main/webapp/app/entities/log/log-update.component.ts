import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { ILog } from 'app/shared/model/log.model';
import { LogService } from './log.service';

@Component({
    selector: 'jhi-log-update',
    templateUrl: './log-update.component.html'
})
export class LogUpdateComponent implements OnInit {
    log: ILog;
    isSaving: boolean;
    fechaDp: any;

    constructor(protected logService: LogService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ log }) => {
            this.log = log;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.log.id !== undefined) {
            this.subscribeToSaveResponse(this.logService.update(this.log));
        } else {
            this.subscribeToSaveResponse(this.logService.create(this.log));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ILog>>) {
        result.subscribe((res: HttpResponse<ILog>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
