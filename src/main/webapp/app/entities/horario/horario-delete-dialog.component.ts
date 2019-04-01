import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IHorario } from 'app/shared/model/horario.model';
import { HorarioService } from './horario.service';

@Component({
    selector: 'jhi-horario-delete-dialog',
    templateUrl: './horario-delete-dialog.component.html'
})
export class HorarioDeleteDialogComponent {
    horario: IHorario;

    constructor(protected horarioService: HorarioService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.horarioService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'horarioListModification',
                content: 'Deleted an horario'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-horario-delete-popup',
    template: ''
})
export class HorarioDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ horario }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(HorarioDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.horario = horario;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/horario', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/horario', { outlets: { popup: null } }]);
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
