import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAdministrador } from 'app/shared/model/administrador.model';
import { AdministradorService } from './administrador.service';

@Component({
    selector: 'jhi-administrador-delete-dialog',
    templateUrl: './administrador-delete-dialog.component.html'
})
export class AdministradorDeleteDialogComponent {
    administrador: IAdministrador;

    constructor(
        protected administradorService: AdministradorService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.administradorService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'administradorListModification',
                content: 'Deleted an administrador'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-administrador-delete-popup',
    template: ''
})
export class AdministradorDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ administrador }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(AdministradorDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.administrador = administrador;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/administrador', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/administrador', { outlets: { popup: null } }]);
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
