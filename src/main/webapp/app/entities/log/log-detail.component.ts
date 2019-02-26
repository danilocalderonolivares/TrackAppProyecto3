import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILog } from 'app/shared/model/log.model';

@Component({
    selector: 'jhi-log-detail',
    templateUrl: './log-detail.component.html'
})
export class LogDetailComponent implements OnInit {
    log: ILog;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ log }) => {
            this.log = log;
        });
    }

    previousState() {
        window.history.back();
    }
}
