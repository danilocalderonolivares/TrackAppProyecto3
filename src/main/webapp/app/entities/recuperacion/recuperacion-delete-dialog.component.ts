import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRecuperacion } from 'app/shared/model/recuperacion.model';
import { RecuperacionService } from './recuperacion.service';

@Component({
    selector: 'jhi-recuperacion-delete-dialog',
    templateUrl: './recuperacion-delete-dialog.component.html'
})
export class RecuperacionDeleteDialogComponent {
    recuperacion: IRecuperacion;

    constructor(
        protected recuperacionService: RecuperacionService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.recuperacionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'recuperacionListModification',
                content: 'Deleted an recuperacion'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-recuperacion-delete-popup',
    template: ''
})
export class RecuperacionDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ recuperacion }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(RecuperacionDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.recuperacion = recuperacion;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/recuperacion', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/recuperacion', { outlets: { popup: null } }]);
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
