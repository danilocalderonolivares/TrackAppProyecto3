import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { ITarea, Tarea } from 'app/shared/model/tarea.model';
import { TareaService } from './tarea.service';
import { ISubTarea, SubTarea } from 'app/shared/model/sub-tarea.model';
import { SubTareaService } from 'app/entities/sub-tarea';
import { Empleado, IEmpleado } from 'app/shared/model/empleado.model';
import { EmpleadoService } from 'app/entities/empleado';
import { IUbicacion, Ubicacion } from 'app/shared/model/ubicacion.model';
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
import { MapService } from 'app/shared/map/map.service';

@Component({
    selector: 'jhi-tarea-update',
    templateUrl: './tarea-update.component.html'
})
export class TareaUpdateComponent implements OnInit, OnDestroy {
    zoom = 12;
    @ViewChild('placesRef') placesRef: GooglePlaceDirective;
    tarea: ITarea;
    isSaving: boolean;
    subtareas: SubTarea[] = [];
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
    empleadosList: any;
    configEmpleados: any;
    configClientes: any;
    configRutas: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected tareaService: TareaService,
        protected subTareaService: SubTareaService,
        protected empleadoService: EmpleadoService,
        protected ubicacionService: UbicacionService,
        protected clienteService: ClienteService,
        protected rutaService: RutaService,
        protected logService: LogService,
        protected activatedRoute: ActivatedRoute,
        protected mapService: MapService
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ tarea }) => {
            this.tarea = tarea;
            if (this.tarea.id !== undefined) {
                this.tarea.usarRuta = false;
            }
        });
        this.subTareaService
            .query({ filter: 'tarea-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<ISubTarea[]>) => mayBeOk.ok),
                map((response: HttpResponse<ISubTarea[]>) => response.body)
            )
            .subscribe(
                (res: ISubTarea[]) => {
                    if (isEmpty(this.tarea.tareas)) {
                        this.subtareas = res;
                    } else {
                        this.subTareaService
                            .query({ 'id.in': _map(this.tarea.tareas, 'id') })
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
                    this.setEmployeeKey(res);
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
                    this.clientes = res;
                    this.configClientes = {
                        displayKey: 'nombre',
                        search: true,
                        height: '210px',
                        placeholder: 'Cliente',
                        customComparator: () => {},
                        limitTo: res.length,
                        moreText: 'más',
                        noResultsFound: 'No se encontraron resultados!',
                        searchPlaceholder: 'ingrese el nombre del cliente',
                        searchOnKey: 'nombre'
                    };
                    // if (!this.tarea.cliente || !this.tarea.cliente.id) {
                    //     this.clientes = res;
                    //     this.configClientes = {
                    //         displayKey: 'nombre',
                    //         search: true,
                    //         height: '210px',
                    //         placeholder: 'Cliente',
                    //         customComparator: () => {},
                    //         limitTo: res.length,
                    //         moreText: 'más',
                    //         noResultsFound: 'No se encontraron resultados!',
                    //         searchPlaceholder: 'ingrese el nombre del cliente',
                    //         searchOnKey: 'nombre'
                    //     };
                    //
                    // } else {
                    //     this.clienteService
                    //         .find(this.tarea.cliente.id)
                    //         .pipe(
                    //             filter((subResMayBeOk: HttpResponse<ICliente>) => subResMayBeOk.ok),
                    //             map((subResponse: HttpResponse<ICliente>) => subResponse.body)
                    //         )
                    //         .subscribe(
                    //             (subRes: ICliente) => (this.clientes = [subRes].concat(res)),
                    //             (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    //         );
                    // }
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
                    this.rutas = res;
                    this.configRutas = {
                        displayKey: 'nombre',
                        search: true,
                        height: '210px',
                        placeholder: 'Ruta',
                        customComparator: () => {},
                        limitTo: res.length,
                        moreText: 'más',
                        noResultsFound: 'No se encontraron resultados!',
                        searchPlaceholder: 'ingrese el nombre de la ruta',
                        searchOnKey: 'nombre'
                    };
                    // if (!this.tarea.ruta || !this.tarea.ruta.id) {
                    //     this.rutas = res;
                    //     this.configRutas = {
                    //         displayKey: 'nombre',
                    //         search: true,
                    //         height: '210px',
                    //         placeholder: 'Ruta',
                    //         customComparator: () => {},
                    //         limitTo: res.length,
                    //         moreText: 'más',
                    //         noResultsFound: 'No se encontraron resultados!',
                    //         searchPlaceholder: 'ingrese el nombre de la ruta',
                    //         searchOnKey: 'nombre'
                    //     };
                    // } else {
                    //     this.rutaService
                    //         .find(this.tarea.ruta.id)
                    //         .pipe(
                    //             filter((subResMayBeOk: HttpResponse<IRuta>) => subResMayBeOk.ok),
                    //             map((subResponse: HttpResponse<IRuta>) => subResponse.body)
                    //         )
                    //         .subscribe(
                    //             (subRes: IRuta) => (this.rutas = [subRes].concat(res)),
                    //             (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    //         );
                    // }
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

    ngOnDestroy() {
        this.mapService.ubications = new Array();
        this.mapService.ubication = new Ubicacion();
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.tarea.tareas = this.subtareas;
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
        const subtarea = new SubTarea(null, value, false);
        this.subtareas.push(subtarea as SubTarea);
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

    onEmpleadoChangeCustom(emp: any) {
        if (emp === undefined || emp === null) {
            this.tarea.empleado = undefined;
        } else {
            let empleado = new Empleado();
            empleado.id = emp.id;
            empleado.nombre = emp.nombre;
            empleado.apellidos = emp.apellidos;
            this.tarea.empleado = empleado;
        }
    }

    onClienteChange(cliente: ICliente) {
        this.tarea.cliente = cliente;
    }

    onRutaChange(ruta: IRuta) {
        this.tarea.ruta = ruta;
    }

    setEmployeeKey(empleados: IEmpleado[]) {
        let empArray = new Array();
        empleados.forEach(empleado => {
            empArray.push({
                id: empleado.id,
                nombre: empleado.nombre,
                apellidos: empleado.apellidos,
                key: empleado.nombre + ' ' + empleado.apellidos
            });
        });
        this.empleadosList = empArray;
        this.configEmpleados = {
            displayKey: 'key',
            search: true,
            height: '210px',
            placeholder: 'Empleado',
            customComparator: () => {},
            limitTo: this.empleadosList.length,
            moreText: 'más',
            noResultsFound: 'No se encontraron resultados!',
            searchPlaceholder: 'ingrese el nombre del empleado',
            searchOnKey: 'key'
        };
    }

    onUpdateEmployee(empleado: IEmpleado) {
        if (empleado === undefined || empleado === null) {
            return undefined;
        } else {
            let customEmp = {
                id: empleado.id,
                nombre: empleado.nombre,
                apellidos: empleado.apellidos,
                key: empleado.nombre + ' ' + empleado.apellidos
            };
            return customEmp;
        }
    }
}
