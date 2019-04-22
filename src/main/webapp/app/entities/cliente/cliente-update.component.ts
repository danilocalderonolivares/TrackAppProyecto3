import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { Cliente, ICliente } from 'app/shared/model/cliente.model';
import { ClienteService } from './cliente.service';
import { IUbicacion } from 'app/shared/model/ubicacion.model';
import { UbicacionService } from 'app/entities/ubicacion';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
    selector: 'jhi-cliente-update',
    templateUrl: './cliente-update.component.html',
    styleUrls: ['./cliente.css']
})
export class ClienteUpdateComponent implements OnInit {
    clienteBuscar: Cliente;
    cedulaBuscar: string;
    clientes: Cliente[];
    clienteExite: boolean;
    errorCedulaNotExists: string;
    clienteForm: FormGroup;
    cliente: ICliente;
    isSaving: boolean;
    ubicacions: IUbicacion[];
    idUbucacion: any;
    // google maps zoom level
    zoom: number = 15;
    nombDireccion: string;
    nombreClienteInput: string = 'Nombre*';
    cedulaClienteInput: string = 'Cédula*';

    lat: number = 9.9359219;
    lng: number = -84.0919663761358;
    locationChosen = false;
    address: string;
    constructor(
        protected jhiAlertService: JhiAlertService,
        protected clienteService: ClienteService,
        protected ubicacionService: UbicacionService,
        protected activatedRoute: ActivatedRoute,
        private _formBuilder: FormBuilder
    ) {}

    ngOnInit() {
        this.clienteForm = this._formBuilder.group({
            nombre: ['', Validators.required],
            cedula: ['', Validators.required],
            correo: ['', [Validators.required, Validators.email]],
            direccion: ['', Validators.required]
        });
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ cliente }) => {
            this.cliente = cliente;
            this.updateData(this.cliente);
        });
        this.ubicacionService
            .query({ filter: 'cliente-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IUbicacion[]>) => mayBeOk.ok),
                map((response: HttpResponse<IUbicacion[]>) => response.body)
            )
            .subscribe(
                (res: IUbicacion[]) => {
                    if (!this.cliente.ubicacion || !this.cliente.ubicacion.id) {
                    } else {
                        this.ubicacionService
                            .find(this.cliente.ubicacion.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IUbicacion>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IUbicacion>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IUbicacion) => (this.ubicacions = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.esEmpresaUpdate();
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.clienteService.findbyCedula(this.cliente.cedula).subscribe(
            res => {
                this.clienteExite = true;
                this.realSave();
            },
            err => {
                this.clienteExite = false;
                this.realSave();
            }
        );
        // var i;
        // this.clienteService.query().subscribe(
        //     res => {
        //         this.clientes = res.body;
        //
        //         for (i = 0; i < this.clientes.length; i++) {
        //             if (this.cliente.cedula === this.clientes[i].cedula) {
        //                 this.clienteExite = true;
        //             } else {
        //                 this.clienteExite = false;
        //             }
        //         }
        //
        //         this.realSave();
        //     },
        //     err => {
        //         console.log(err);
        //     }
        // );
    }
    realSave() {
        this.isSaving = true;
        if (this.cliente.id !== undefined) {
            this.cliente.ubicacion.id = this.idUbucacion;
            this.subscribeToSaveResponse(this.clienteService.update(this.cliente));
        } else {
            if (this.clienteExite === false) {
                this.subscribeToSaveResponse(this.clienteService.create(this.cliente));
            } else {
                this.errorCedulaNotExists = 'ERROR';
            }
        }
    }
    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICliente>>) {
        result.subscribe((res: HttpResponse<ICliente>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackUbicacionById(index: number, item: IUbicacion) {
        return item.id;
    }
    mapClicked(event) {
        this.lat = event.coords.lat;
        this.lng = event.coords.lng;

        this.locationChosen = true;
        this.cliente.ubicacion = {
            latitud: event.coords.lat,
            longitud: event.coords.lng
        };
        this.locationSelect();
    }

    locationSelect() {
        this.clienteService.getAddress(this.lat, this.lng).subscribe(
            res => {
                this.cliente.direccion = res.results[0].formatted_address;
                this.cliente.ubicacion.nombreDireccion = res.results[0].formatted_address;
            },
            err => {
                console.log(err);
            }
        );
    }
    updateData(clienteData: ICliente) {
        if (clienteData.id !== undefined) {
            (this.idUbucacion = clienteData.ubicacion.id), (this.lat = clienteData.ubicacion.latitud);
            this.lng = clienteData.ubicacion.longitud;
            this.locationChosen = true;
        }
    }
    esEmpresa(result: boolean) {
        if (result !== true) {
            this.nombreClienteInput = 'Nombre de la empresa*';
            this.cedulaClienteInput = 'Cédula Jurídica';
        } else {
            this.nombreClienteInput = 'Nombre*';
            this.cedulaClienteInput = 'Cédula';
        }
    }
    esEmpresaUpdate() {
        if (this.cliente.id !== undefined) {
            if (this.cliente.esEmpresa !== false) {
                this.nombreClienteInput = 'Nombre de la empresa*';
                this.cedulaClienteInput = 'Cédula Jurídica';
            } else {
                this.nombreClienteInput = 'Nombre*';
                this.cedulaClienteInput = 'Cédula';
            }
        }
    }
}
