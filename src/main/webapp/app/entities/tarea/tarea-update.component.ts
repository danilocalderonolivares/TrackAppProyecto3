import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
import { IUbicacion, Ubicacion } from 'app/shared/model/ubicacion.model';
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
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-tarea-update',
    templateUrl: './tarea-update.component.html',
    styleUrls: ['tarea-update.component.css'],
    providers: [NgbModalConfig, NgbModal]
})
export class TareaUpdateComponent implements OnInit, OnDestroy {
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
    empleadosList: any;
    configEmpleados: any;
    configClientes: any;
    configRutas: any;
    fechaInicio: Date;
    fechaFin: Date;
    tareaForm: FormGroup;
    empValidation: boolean;
    clienteValidation: boolean;
    rutaValidation: boolean;
    noLocation: boolean;
    locationType: string;
    editValidation = true;
    @ViewChild('content') modal: HTMLElement;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected tareaService: TareaService,
        protected subTareaService: SubTareaService,
        protected empleadoService: EmpleadoService,
        protected clienteService: ClienteService,
        protected rutaService: RutaService,
        protected logService: LogService,
        protected activatedRoute: ActivatedRoute,
        protected mapService: MapService,
        private _formBuilder: FormBuilder,
        config: NgbModalConfig,
        private modalService: NgbModal
    ) {
        this.empValidation = false;
        this.clienteValidation = false;
        this.rutaValidation = false;
        this.noLocation = false;
        config.backdrop = 'static';
        config.keyboard = false;
    }

    ngOnInit() {
        this.isSaving = false;
        this.tareaForm = this._formBuilder.group({
            titulo: ['', Validators.required],
            descripcion: [],
            inicio: ['', Validators.required],
            fin: ['', Validators.required],
            ubicacion: ['', this.ubicationValidation.bind(this)]
        });
        this.activatedRoute.data.subscribe(({ tarea }) => {
            this.tarea = tarea;
            if (this.tarea.id !== undefined) {
                this.fechaInicio = new Date(this.tarea.inicio.format('M/D/YYYY h:mm'));
                this.fechaFin = new Date(this.tarea.fin.format('M/D/YYYY h:mm'));
                // if (!this.tarea.usarRuta) {
                //     const ubts: IUbicacion[] = new Array();
                //     ubts.push(this.tarea.ubicacion);
                //     this.mapService.ubications = ubts;
                //     this.mapService.ubication = this.tarea.ubicacion;
                // } else {
                //     this.mapService.ubications = this.tarea.ruta.ubicaciones;
                // }
                this.mapService.ubication = this.tarea.ubicacion;
                if (this.tarea.ruta === null) {
                    const ubts: IUbicacion[] = new Array();
                    ubts.push(this.tarea.ubicacion);
                    this.mapService.ubications = ubts;
                } else {
                    this.mapService.ubications = this.tarea.ruta.ubicaciones;
                    this.mapService.ubications.push(this.tarea.ubicacion);
                }
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
        this.tarea.inicio = moment(this.fechaInicio);
        this.tarea.fin = moment(this.fechaFin);
        this.tarea.ubicacion = this.mapService.ubication;
        if (!this.tarea.usarRuta) {
            this.tarea.ruta = undefined;
        }
        // if (!this.tarea.usarRuta) {
        //
        //    this.tarea.ruta = undefined;
        // } else {
        //     this.tarea.ubicacion = undefined;
        // }
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
                // completado: boolean = false;
                descripcion: string = value;
                id: string;
            }()
        );
        this.nvaSubtarea = '';
    }

    eliminarSubtarea(index: number) {
        this.subtareas = reject(this.subtareas, (e, i) => i === index);
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
                if (usuario && includes(e.authorities, 'ROLE_USER')) {
                    return new UserCustomUser(e, usuario);
                }
            })
        );
    }

    onEmpleadoChange(newValue) {
        this.tarea.empleado = newValue.user;
    }

    onEmpleadoChangeCustom(emp: any) {
        if (emp === undefined || emp === null) {
            this.tarea.empleado = undefined;
            this.empValidation = true;
        } else {
            this.empValidation = false;
            const empleado = new Empleado();
            empleado.id = emp.id;
            empleado.nombre = emp.nombre;
            empleado.apellidos = emp.apellidos;
            this.tarea.empleado = empleado;
        }
    }

    onClienteChange(cliente: ICliente) {
        if (cliente === undefined || cliente === null) {
            this.clienteValidation = true;
        } else {
            this.clienteValidation = false;
            this.tarea.cliente = cliente;
            this.modalService.open(this.modal);
        }
    }

    onRutaChange(ruta: IRuta) {
        if (ruta === undefined || (ruta === null && this.tarea.usarRuta === true)) {
            this.rutaValidation = true;
        } else {
            this.rutaValidation = false;
            this.noLocation = false;
            this.tarea.ruta = ruta;
            this.mapService.ubications = ruta.ubicaciones;
        }
    }

    setEmployeeKey(empleados: IEmpleado[]) {
        const empArray = new Array();
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
            const customEmp = {
                id: empleado.id,
                nombre: empleado.nombre,
                apellidos: empleado.apellidos,
                key: empleado.nombre + ' ' + empleado.apellidos
            };
            return customEmp;
        }
    }

    validRoute() {
        if (this.tarea.id !== undefined) {
            this.validRouteOnEdition();
        } else {
            if (this.tarea.usarRuta) {
                this.rutaValidation = false;
                this.tarea.ruta = undefined;
                this.noLocation = false;
            } else {
                this.noLocation = true;
            }
            this.mapService.ubications = new Array();
        }
    }

    validRouteOnEdition() {
        if (!this.tarea.usarRuta) {
            this.rutaValidation = false;
            this.noLocation = false;
            this.mapService.ubications = this.tarea.ruta.ubicaciones;
        } else {
            this.noLocation = true;
            this.mapService.ubications = new Array();
            this.mapService.ubications.push(this.tarea.ubicacion);
        }
        //     if (this.editValidation) {
        //         if (this.tarea.ruta !== null) {
        //             this.locationType = 'ruta';
        //             this.editValidation = false;
        //         } else {
        //             this.locationType = 'ubicacion';
        //             this.editValidation = false;
        //         }
        //     }
        //
        //     if (this.locationType === 'ruta') {
        //         if (!this.tarea.usarRuta) {
        //             this.rutaValidation = false;
        //             this.noLocation = false;
        //             this.mapService.ubications = this.tarea.ruta.ubicaciones;
        //         } else {
        //             this.noLocation = true;
        //             this.mapService.ubications = new Array();
        //             // this.mapService.ubication = new Ubicacion();
        //         }
        //     }
        //     if (this.locationType === 'ubicacion') {
        //         if (this.tarea.usarRuta) {
        //             const ubts: IUbicacion[] = new Array();
        //             ubts.push(this.tarea.ubicacion);
        //             this.mapService.ubications = ubts;
        //         } else {
        //             this.rutaValidation = false;
        //             this.tarea.ruta = undefined;
        //             this.noLocation = false;
        //             this.mapService.ubications = new Array();
        //         }
        //     }
    }

    ubicationValidation(control: FormControl): { [s: string]: boolean } {
        if (this.mapService.ubication.latitud === undefined && this.mapService.ubication.longitud === undefined) {
            return { ubicationRequired: true };
        }
        return null;
    }

    addClientUbication() {
        this.tarea.ubicacion = this.tarea.cliente.ubicacion;
        this.mapService.ubication = this.tarea.cliente.ubicacion;
        const ubts: IUbicacion[] = new Array();
        ubts.push(this.tarea.cliente.ubicacion);
        this.mapService.ubications = ubts;
    }
}
