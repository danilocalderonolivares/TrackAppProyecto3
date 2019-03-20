import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ICliente } from 'app/shared/model/cliente.model';
import { ClienteService } from './cliente.service';
import { IUbicacion } from 'app/shared/model/ubicacion.model';
import { UbicacionService } from 'app/entities/ubicacion';

@Component({
    selector: 'jhi-cliente-update',
    templateUrl: './cliente-update.component.html',
    styleUrls: ['./cliente.css']
})
export class ClienteUpdateComponent implements OnInit {
    cliente: ICliente;
    isSaving: boolean;
    ubicacions: IUbicacion[];
    // google maps zoom level
    zoom: number = 15;

    lat: number = 9.9359219;
    lng: number = -84.0919663761358;
    locationChosen = false;
    address: string;
    constructor(
        protected jhiAlertService: JhiAlertService,
        protected clienteService: ClienteService,
        protected ubicacionService: UbicacionService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ cliente }) => {
            this.cliente = cliente;
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
                        this.ubicacions = res;
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
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.cliente.id !== undefined) {
            this.cliente.ubicacion = {};
            this.subscribeToSaveResponse(this.clienteService.update(this.cliente));
        } else {
            this.subscribeToSaveResponse(this.clienteService.create(this.cliente));
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
        this.locationSelect();
        this.cliente.ubicacion = {
            nombreDireccion: this.cliente.direccion,
            latitud: this.lat,
            longitud: this.lng
        };
    }

    locationSelect() {
        this.clienteService.getAddress(this.lat, this.lng).subscribe(
            res => {
                this.cliente.direccion = res.results[0].formatted_address;
            },
            err => {
                console.log(err);
            }
        );
    }
}
