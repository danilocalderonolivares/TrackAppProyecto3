import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JhiAlertService } from 'ng-jhipster';
import { IUbicacion } from 'app/shared/model/ubicacion.model';
import { IRuta } from 'app/shared/model/ruta.model';
import { RutaService } from '../ruta.service';
import { Ubicacion } from 'app/shared/model/ubicacion.model';
import { NgForm } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-ubicacion-form',
    templateUrl: './ubicacion-form.component.html',
    providers: [NgbModalConfig, NgbModal]
})
export class UbicacionFormComponent implements OnInit, OnDestroy {
    isSaving: boolean;
    @ViewChild('editForm') form: NgForm;
    public editOrDelete = false;
    addedUbication = false;
    index: number = 0;
    @ViewChild('content') modal: HTMLElement;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected rutaService: RutaService,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        config: NgbModalConfig,
        private modalService: NgbModal
    ) {
        config.backdrop = 'static';
        config.keyboard = false;
    }

    ngOnInit() {
        if (this.rutaService.ubicaciones.length > 0) {
            this.addedUbication = true;
        }
    }

    ngOnDestroy() {
        this.form.reset();
        this.rutaService.ubication = new Ubicacion();
        this.editOrDelete = false;
    }

    previousState() {
        localStorage.setItem('currentUbications', JSON.stringify(this.rutaService.ubicaciones));
        this.form.reset();
        this.rutaService.ubicaciones = JSON.parse(localStorage.getItem('currentUbications'));
        this.rutaService.ubication = new Ubicacion();
        this.editOrDelete = false;
    }

    protected saveUbication() {
        this.isSaving = false;
        if (!this.checkIfExist()) {
            this.rutaService.ubicaciones.push(this.rutaService.ubication);
            this.previousState();
        }
        this.addedUbication = true;
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackRutaById(index: number, item: IRuta) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }

    checkIfExist() {
        let exist = false;
        if (this.rutaService.ubicaciones !== null) {
            this.rutaService.ubicaciones.forEach(myUbication => {
                if (
                    myUbication.latitud === this.rutaService.ubication.latitud &&
                    myUbication.longitud === this.rutaService.ubication.longitud
                ) {
                    exist = true;
                    this.modalService.open(this.modal);
                }
            });
        }
        return exist;
    }

    onSelectedUbication(ubi: IUbicacion, i: number) {
        this.rutaService.ubication.latitud = ubi.latitud;
        this.rutaService.ubication.longitud = ubi.longitud;
        this.rutaService.ubication.nombreDireccion = ubi.nombreDireccion;
        this.index = i;
        this.editOrDelete = true;
    }

    protected updateUbication() {
        this.rutaService.ubicaciones[this.index] = this.rutaService.ubication;
        this.previousState();
        this.editOrDelete = false;
    }

    deleteUbication() {
        for (let i = 0; i <= this.rutaService.ubicaciones.length; i++) {
            if (
                this.rutaService.ubicaciones[i].nombreDireccion === this.rutaService.ubication.nombreDireccion &&
                this.rutaService.ubicaciones[i].latitud === this.rutaService.ubication.latitud &&
                this.rutaService.ubicaciones[i].longitud === this.rutaService.ubication.longitud
            ) {
                this.rutaService.ubicaciones.splice(i, 1);
                break;
            }
        }

        this.previousState();
        this.editOrDelete = false;
        if (this.rutaService.ubicaciones.length === 0 || this.rutaService.ubicaciones === null) {
            this.addedUbication = false;
        }
    }

    onFillList() {
        localStorage.setItem('currentUbications', JSON.stringify(this.rutaService.ubicaciones));
        this.rutaService.ubicaciones = new Array();
        if (this.rutaService.onEdition) {
            window.history.back();
        } else {
            this.router.navigate(['/ruta/new']);
        }
    }
}
