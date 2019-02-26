import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILog } from 'app/shared/model/log.model';
import { LogService } from './log.service';

@Component({
    selector: 'jhi-log-delete-dialog',
    templateUrl: './log-delete-dialog.component.html'
})
export class LogDeleteDialogComponent {
    log: ILog;

    constructor(protected logService: LogService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.logService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'logListModification',
                content: 'Deleted an log'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-log-delete-popup',
    template: ''
})
export class LogDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ log }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(LogDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.log = log;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/log', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/log', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
