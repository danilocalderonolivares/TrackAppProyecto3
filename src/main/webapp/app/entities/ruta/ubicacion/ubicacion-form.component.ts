import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JhiAlertService } from 'ng-jhipster';
import { IUbicacion } from 'app/shared/model/ubicacion.model';
import { IRuta } from 'app/shared/model/ruta.model';
import { RutaService } from '../ruta.service';
import { Ubicacion } from 'app/shared/model/ubicacion.model';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ICliente } from 'app/shared/model/cliente.model';
import { ClienteService } from 'app/entities/cliente';
import { filter, map } from 'rxjs/operators';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { MapService } from 'app/shared/map/map.service';

@Component({
    selector: 'jhi-ubicacion-form',
    templateUrl: './ubicacion-form.component.html',
    providers: [NgbModalConfig, NgbModal]
})
export class UbicacionFormComponent implements OnInit, OnDestroy {
    ubicationForm: FormGroup;
    isSaving: boolean;
    @ViewChild('editForm') form: NgForm;
    public editOrDelete = false;
    addedUbication = false;
    index: number = 0;
    @ViewChild('content') modal: HTMLElement;
    clientes: ICliente[];
    cliente: ICliente;
    config: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected rutaService: RutaService,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        config: NgbModalConfig,
        private modalService: NgbModal,
        protected clienteService: ClienteService,
        protected mapService: MapService,
        private _formBuilder: FormBuilder
    ) {
        config.backdrop = 'static';
        config.keyboard = false;
    }

    ngOnInit() {
        this.ubicationForm = this._formBuilder.group({
            nombreDireccion: ['', Validators.required],
            latitud: ['', Validators.required],
            longitud: ['', Validators.required]
        });

        if (this.mapService.ubications.length > 0) {
            this.addedUbication = true;
        }
        this.setClientes();
    }

    ngOnDestroy() {
        this.form.reset();
        this.mapService.ubication = new Ubicacion();
        this.mapService.ubications = new Array();
        this.editOrDelete = false;
    }

    previousState() {
        localStorage.setItem('currentUbications', JSON.stringify(this.mapService.ubications));
        this.form.reset();
        this.mapService.ubications = JSON.parse(localStorage.getItem('currentUbications'));
        localStorage.removeItem('currentUbications');
        this.mapService.ubication = new Ubicacion();
        this.editOrDelete = false;
        this.cliente = null;
    }

    protected saveUbication() {
        this.isSaving = false;
        if (!this.checkIfExist()) {
            this.mapService.ubications.push(this.mapService.ubication);
            this.previousState();
            this.addedUbication = true;
        }
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
        if (this.mapService.ubications !== null) {
            this.mapService.ubications.forEach(myUbication => {
                if (
                    myUbication.latitud === this.mapService.ubication.latitud &&
                    myUbication.longitud === this.mapService.ubication.longitud
                ) {
                    exist = true;
                    this.modalService.open(this.modal);
                }
            });
        }
        return exist;
    }

    onSelectedUbication(ubi: IUbicacion, i: number) {
        this.mapService.ubication.latitud = ubi.latitud;
        this.mapService.ubication.longitud = ubi.longitud;
        this.mapService.ubication.nombreDireccion = ubi.nombreDireccion;
        this.index = i;
        this.editOrDelete = true;
    }

    protected updateUbication() {
        this.mapService.ubications[this.index] = this.mapService.ubication;
        this.previousState();
        this.editOrDelete = false;
    }

    deleteUbication() {
        for (let i = 0; i <= this.mapService.ubications.length; i++) {
            if (
                this.mapService.ubications[i].nombreDireccion === this.mapService.ubication.nombreDireccion &&
                this.mapService.ubications[i].latitud === this.mapService.ubication.latitud &&
                this.mapService.ubications[i].longitud === this.mapService.ubication.longitud
            ) {
                this.mapService.ubications.splice(i, 1);
                break;
            }
        }

        this.previousState();
        this.editOrDelete = false;
        if (this.mapService.ubications.length === 0 || this.mapService.ubications === null) {
            this.addedUbication = false;
        }
    }

    onFillList() {
        localStorage.setItem('currentUbications', JSON.stringify(this.mapService.ubications));
        this.mapService.ubications = new Array();
        if (this.rutaService.onEdition) {
            window.history.back();
        } else {
            this.router.navigate(['/ruta/new']);
        }
    }

    setClientes() {
        this.clienteService
            .query({ filter: 'tarea-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<ICliente[]>) => mayBeOk.ok),
                map((response: HttpResponse<ICliente[]>) => response.body)
            )
            .subscribe(
                (res: ICliente[]) => {
                    this.clientes = res;
                    this.config = {
                        displayKey: 'nombre',
                        search: true,
                        height: '210px',
                        placeholder: 'dirección cliente',
                        customComparator: () => {},
                        limitTo: this.clientes.length,
                        moreText: 'más',
                        noResultsFound: 'No se encontraron resultados!',
                        searchPlaceholder: 'ingrese el nombre del cliente',
                        searchOnKey: 'nombre'
                    };
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    trackClienteById(index: number, item: ICliente) {
        return item.id;
    }

    onChangeClient(cliente: ICliente) {
        this.cliente = cliente;
        this.mapService.ubication.latitud = cliente.ubicacion.latitud;
        this.mapService.ubication.longitud = cliente.ubicacion.longitud;
        this.mapService.ubication.nombreDireccion = cliente.ubicacion.nombreDireccion;
    }
}
