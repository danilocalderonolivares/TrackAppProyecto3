import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IMensaje } from 'app/shared/model/mensaje.model';
import { MensajeService } from './mensaje.service';
import { IAdministrador } from 'app/shared/model/administrador.model';
import { AdministradorService } from 'app/entities/administrador';
import { IEmpleado } from 'app/shared/model/empleado.model';
import { EmpleadoService } from 'app/entities/empleado';

@Component({
    selector: 'jhi-mensaje-update',
    templateUrl: './mensaje-update.component.html'
})
export class MensajeUpdateComponent implements OnInit {
    mensaje: IMensaje;
    isSaving: boolean;

    admins: IAdministrador[];

    empleados: IEmpleado[];
    fechaEnvioDp: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected mensajeService: MensajeService,
        protected administradorService: AdministradorService,
        protected empleadoService: EmpleadoService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ mensaje }) => {
            this.mensaje = mensaje;
        });
        this.administradorService
            .query({ filter: 'mensaje-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IAdministrador[]>) => mayBeOk.ok),
                map((response: HttpResponse<IAdministrador[]>) => response.body)
            )
            .subscribe(
                (res: IAdministrador[]) => {
                    if (!this.mensaje.admin || !this.mensaje.admin.id) {
                        this.admins = res;
                    } else {
                        this.administradorService
                            .find(this.mensaje.admin.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IAdministrador>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IAdministrador>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IAdministrador) => (this.admins = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.empleadoService
            .query({ filter: 'mensaje-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IEmpleado[]>) => mayBeOk.ok),
                map((response: HttpResponse<IEmpleado[]>) => response.body)
            )
            .subscribe(
                (res: IEmpleado[]) => {
                    if (!this.mensaje.empleado || !this.mensaje.empleado.id) {
                        this.empleados = res;
                    } else {
                        this.empleadoService
                            .find(this.mensaje.empleado.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IEmpleado>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IEmpleado>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IEmpleado) => (this.empleados = [subRes].concat(res)),
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
        if (this.mensaje.id !== undefined) {
            this.subscribeToSaveResponse(this.mensajeService.update(this.mensaje));
        } else {
            this.subscribeToSaveResponse(this.mensajeService.create(this.mensaje));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IMensaje>>) {
        result.subscribe((res: HttpResponse<IMensaje>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackAdministradorById(index: number, item: IAdministrador) {
        return item.id;
    }

    trackEmpleadoById(index: number, item: IEmpleado) {
        return item.id;
    }
}
