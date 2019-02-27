import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRuta } from 'app/shared/model/ruta.model';
import { RutaService } from './ruta.service';

@Component({
    selector: 'jhi-ruta-delete-dialog',
    templateUrl: './ruta-delete-dialog.component.html'
})
export class RutaDeleteDialogComponent {
    ruta: IRuta;

    constructor(protected rutaService: RutaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.rutaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'rutaListModification',
                content: 'Deleted an ruta'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-ruta-delete-popup',
    template: ''
})
export class RutaDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ ruta }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(RutaDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.ruta = ruta;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/ruta', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/ruta', { outlets: { popup: null } }]);
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
