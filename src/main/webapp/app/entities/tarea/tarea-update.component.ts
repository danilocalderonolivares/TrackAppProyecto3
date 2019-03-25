import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { ITarea } from 'app/shared/model/tarea.model';
import { TareaService } from './tarea.service';
import { ISubTarea } from 'app/shared/model/sub-tarea.model';
import { SubTareaService } from 'app/entities/sub-tarea';
import { IEmpleado } from 'app/shared/model/empleado.model';
import { EmpleadoService } from 'app/entities/empleado';
import { IUbicacion } from 'app/shared/model/ubicacion.model';
import { UbicacionService } from 'app/entities/ubicacion';
import { ICliente } from 'app/shared/model/cliente.model';
import { ClienteService } from 'app/entities/cliente';
import { IRuta } from 'app/shared/model/ruta.model';
import { RutaService } from 'app/entities/ruta';
import { ILog } from 'app/shared/model/log.model';
import { LogService } from 'app/entities/log';

import { reject } from 'lodash';
import { isEmpty } from 'lodash';
import { map as _map } from 'lodash';

@Component({
    selector: 'jhi-tarea-update',
    templateUrl: './tarea-update.component.html'
})
export class TareaUpdateComponent implements OnInit {
    tarea: ITarea;
    isSaving: boolean;

    subtareas: ISubTarea[];

    empleados: IEmpleado[];

    ubicacions: IUbicacion[];

    clientes: ICliente[];

    rutas: IRuta[];

    logs: ILog[];
    inicioDp: any;
    finDp: any;
    horaInicioDp: any;
    horaFinDp: any;

    nvaSubtarea: string = '';

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected tareaService: TareaService,
        protected subTareaService: SubTareaService,
        protected empleadoService: EmpleadoService,
        protected ubicacionService: UbicacionService,
        protected clienteService: ClienteService,
        protected rutaService: RutaService,
        protected logService: LogService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ tarea }) => {
            this.tarea = tarea;
        });
        this.subTareaService
            .query({ filter: 'tarea-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<ISubTarea[]>) => mayBeOk.ok),
                map((response: HttpResponse<ISubTarea[]>) => response.body)
            )
            .subscribe(
                (res: ISubTarea[]) => {
                    if (isEmpty(this.tarea.subtarea)) {
                        this.subtareas = res;
                    } else {
                        this.subTareaService
                            .query({ 'id.in': _map(this.tarea.subtarea, 'id') })
                            .pipe(
                                filter((res: HttpResponse<ISubTarea[]>) => res.ok),
                                map((res: HttpResponse<ISubTarea[]>) => res.body)
                            )
                            .subscribe(
                                (res: ISubTarea[]) => {
                                    this.subtareas = res;
                                },
                                (res: HttpErrorResponse) => this.onError(res.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.empleadoService
            .query({ filter: 'tarea-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IEmpleado[]>) => mayBeOk.ok),
                map((response: HttpResponse<IEmpleado[]>) => response.body)
            )
            .subscribe(
                (res: IEmpleado[]) => {
                    if (!this.tarea.empleado || !this.tarea.empleado.id) {
                        this.empleados = res;
                    } else {
                        this.empleadoService
                            .find(this.tarea.empleado.id)
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
        this.ubicacionService
            .query({ filter: 'tarea-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IUbicacion[]>) => mayBeOk.ok),
                map((response: HttpResponse<IUbicacion[]>) => response.body)
            )
            .subscribe(
                (res: IUbicacion[]) => {
                    if (!this.tarea.ubicacion || !this.tarea.ubicacion.id) {
                        this.ubicacions = res;
                    } else {
                        this.ubicacionService
                            .find(this.tarea.ubicacion.id)
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
        this.clienteService
            .query({ filter: 'tarea-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<ICliente[]>) => mayBeOk.ok),
                map((response: HttpResponse<ICliente[]>) => response.body)
            )
            .subscribe(
                (res: ICliente[]) => {
                    if (!this.tarea.cliente || !this.tarea.cliente.id) {
                        this.clientes = res;
                    } else {
                        this.clienteService
                            .find(this.tarea.cliente.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<ICliente>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<ICliente>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: ICliente) => (this.clientes = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.rutaService
            .query({ filter: 'tarea-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IRuta[]>) => mayBeOk.ok),
                map((response: HttpResponse<IRuta[]>) => response.body)
            )
            .subscribe(
                (res: IRuta[]) => {
                    if (!this.tarea.ruta || !this.tarea.ruta.id) {
                        this.rutas = res;
                    } else {
                        this.rutaService
                            .find(this.tarea.ruta.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IRuta>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IRuta>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IRuta) => (this.rutas = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.logService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ILog[]>) => mayBeOk.ok),
                map((response: HttpResponse<ILog[]>) => response.body)
            )
            .subscribe((res: ILog[]) => (this.logs = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.tarea.subtarea;
        if (this.tarea.id !== undefined) {
            this.subscribeToSaveResponse(this.tareaService.update(this.tarea));
        } else {
            this.subscribeToSaveResponse(this.tareaService.create(this.tarea));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ITarea>>) {
        result.subscribe((res: HttpResponse<ITarea>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackSubTareaById(index: number, item: ISubTarea) {
        return item.id;
    }

    trackEmpleadoById(index: number, item: IEmpleado) {
        return item.id;
    }

    trackUbicacionById(index: number, item: IUbicacion) {
        return item.id;
    }

    trackClienteById(index: number, item: ICliente) {
        return item.id;
    }

    trackRutaById(index: number, item: IRuta) {
        return item.id;
    }

    trackLogById(index: number, item: ILog) {
        return item.id;
    }

    addSubtarea(value: string) {
        this.subtareas.push({ descripcion: value, completado: false });
        this.nvaSubtarea = '';
    }

    eliminarSubtarea(index: number) {
        this.subtareas = reject(this.subtareas, (e, i) => i === index);
    }
}
