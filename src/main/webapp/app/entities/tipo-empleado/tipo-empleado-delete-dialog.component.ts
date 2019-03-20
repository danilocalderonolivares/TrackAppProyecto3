import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITipoEmpleado } from 'app/shared/model/tipo-empleado.model';
import { TipoEmpleadoService } from './tipo-empleado.service';

@Component({
    selector: 'jhi-tipo-empleado-delete-dialog',
    templateUrl: './tipo-empleado-delete-dialog.component.html'
})
export class TipoEmpleadoDeleteDialogComponent {
    tipoEmpleado: ITipoEmpleado;

    constructor(
        protected tipoEmpleadoService: TipoEmpleadoService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.tipoEmpleadoService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'tipoEmpleadoListModification',
                content: 'Deleted an tipoEmpleado'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tipo-empleado-delete-popup',
    template: ''
})
export class TipoEmpleadoDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ tipoEmpleado }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TipoEmpleadoDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.tipoEmpleado = tipoEmpleado;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/tipo-empleado', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/tipo-empleado', { outlets: { popup: null } }]);
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
