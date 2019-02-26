import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISubTarea } from 'app/shared/model/sub-tarea.model';
import { SubTareaService } from './sub-tarea.service';

@Component({
    selector: 'jhi-sub-tarea-delete-dialog',
    templateUrl: './sub-tarea-delete-dialog.component.html'
})
export class SubTareaDeleteDialogComponent {
    subTarea: ISubTarea;

    constructor(protected subTareaService: SubTareaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.subTareaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'subTareaListModification',
                content: 'Deleted an subTarea'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-sub-tarea-delete-popup',
    template: ''
})
export class SubTareaDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ subTarea }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SubTareaDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.subTarea = subTarea;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/sub-tarea', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/sub-tarea', { outlets: { popup: null } }]);
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
