import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICliente } from 'app/shared/model/cliente.model';
import { ClienteService } from './cliente.service';
import {TareaService} from "app/entities/tarea";
import {SubTarea} from "app/shared/model/sub-tarea.model";
import {Tarea} from "app/shared/model/tarea.model";

@Component({
    selector: 'jhi-cliente-delete-dialog',
    templateUrl: './cliente-delete-dialog.component.html'
})
export class ClienteDeleteDialogComponent implements OnInit{
    cliente: ICliente;
    tareas: Tarea[] = [];
    esPosibleBorrar: boolean;
    idDelete:string

    constructor(protected clienteService: ClienteService,
                public activeModal: NgbActiveModal,
                protected eventManager: JhiEventManager,
                protected tareaService: TareaService) {}

    ngOnInit() {
        this.validarRelacionCliente();
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {

      if (this.esPosibleBorrar === true){
          this.clienteService.delete(id).subscribe(response => {
              this.eventManager.broadcast({
                  name: 'clienteListModification',
                  content: 'Deleted an cliente'
              });
              this.activeModal.dismiss(true);
          });
      }

    }
    validarRelacionCliente(){
        this.tareaService.query().subscribe(
            res=>{
                this.tareas = res.body;
                this.restringirbtn();
            },
            err=>{
                console.log(err);
            }
        );
    }
    restringirbtn(){
        var i;
        for (i=0;i<this.tareas.length;i++){
            if (this.tareas[i].cliente.id === this.cliente.id){
                this.esPosibleBorrar = false;
            }
            else {
                this.esPosibleBorrar = true;
            }
        }
    }

}

@Component({
    selector: 'jhi-cliente-delete-popup',
    template: ''
})
export class ClienteDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;
    constructor(protected activatedRoute: ActivatedRoute,
                protected router: Router,
                protected modalService: NgbModal) {}

    ngOnInit() {

        this.activatedRoute.data.subscribe(({ cliente }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ClienteDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.cliente = cliente;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/cliente', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/cliente', { outlets: { popup: null } }]);
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
