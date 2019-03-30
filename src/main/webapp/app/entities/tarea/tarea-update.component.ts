import { Component, OnInit, ViewChild } from '@angular/core';
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
import { Empleado, IEmpleado } from 'app/shared/model/empleado.model';
import { EmpleadoService } from 'app/entities/empleado';
import { IUbicacion } from 'app/shared/model/ubicacion.model';
import { UbicacionService } from 'app/entities/ubicacion';
import { ICliente } from 'app/shared/model/cliente.model';
import { ClienteService } from 'app/entities/cliente';
import { IRuta } from 'app/shared/model/ruta.model';
import { RutaService } from 'app/entities/ruta';
import { ILog } from 'app/shared/model/log.model';
import { LogService } from 'app/entities/log';
import { UserService, User } from 'app/core';

import { reject } from 'lodash';
import { isEmpty } from 'lodash';
import { find } from 'lodash';
import { includes } from 'lodash';
import { compact } from 'lodash';
import { map as _map } from 'lodash';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { UserCustomUser } from 'app/shared/model/user_CustomUser.model';

@Component({
    selector: 'jhi-tarea-update',
    templateUrl: './tarea-update.component.html'
})
export class TareaUpdateComponent implements OnInit {
    zoom = 12;
    @ViewChild('placesRef') placesRef: GooglePlaceDirective;
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
    nvaSubtarea = '';
    users: User[];
    empleadosBase: UserCustomUser[];

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
                                filter((res2: HttpResponse<ISubTarea[]>) => res2.ok),
                                map((res3: HttpResponse<ISubTarea[]>) => res3.body)
                            )
                            .subscribe(
                                (res4: ISubTarea[]) => {
                                    this.subtareas = res4;
                                },
                                (res5: HttpErrorResponse) => this.onError(res5.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );

        this.empleadoService
            .queryCustom()
            .pipe(
                filter((res: HttpResponse<IEmpleado[]>) => res.ok),
                map((res: HttpResponse<IEmpleado[]>) => res.body)
            )
            .subscribe(
                (res: IEmpleado[]) => {
                    this.empleados = res;
                },
                (res: HttpErrorResponse) => console.log(res.message)
            );

        if (isEmpty(this.tarea.ubicacion)) {
            this.tarea.ubicacion = new class implements IUbicacion {
                id: string;
                latitud: number;
                longitud: number;
                nombreDireccion: string;
            }();
        }
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
        this.tarea.subtarea = this.subtareas;
        this.tarea.inicio = moment(this.tarea.inicio);
        this.tarea.fin = moment(this.tarea.fin);
        if (this.tarea.id !== undefined) {
            this.subscribeToSaveResponse(this.tareaService.update(this.tarea));
        } else {
            this.tarea.activa = true;
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
        this.subtareas.push(
            new class implements ISubTarea {
                completado: boolean = false;
                descripcion: string = value;
                id: string;
            }()
        );
        this.nvaSubtarea = '';
    }

    eliminarSubtarea(index: number) {
        this.subtareas = reject(this.subtareas, (e, i) => i === index);
    }

    onChoseLocation(event) {
        const ubicacion: IUbicacion = {
            latitud: event.coords.lat,
            longitud: event.coords.lng
        };
        this.tarea.ubicacion = ubicacion;
    }

    public handleAddressChange(address: Address) {
        const ubicacion: IUbicacion = {
            latitud: address.geometry.location.lat(),
            longitud: address.geometry.location.lng()
        };
        this.tarea.ubicacion = ubicacion;
    }

    loadCustomUserInfo() {
        this.empleadoService
            .query()
            .subscribe((res: HttpResponse<Empleado[]>) => this.fillUserFullInfo(res), (res: HttpResponse<any>) => this.onError(res.body));
    }

    fillUserFullInfo(res) {
        this.empleadosBase = compact(
            _map(this.users, e => {
                const usuario = find(res.body, { idUsuarioRelacion: e.id });
                if (usuario && includes(e.authorities, 'ROLE_USER')) return new UserCustomUser(e, usuario);
            })
        );
    }

    onEmpleadoChange(newValue) {
        this.tarea.empleado = newValue.user;
    }

    onEmpleadoChangeCustom(empleado: IEmpleado) {
        this.tarea.empleado = empleado;
    }
}
