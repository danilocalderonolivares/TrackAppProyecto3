import { Injectable } from '@angular/core';
import { EmpleadoService } from 'app/entities/empleado';
import { filter, map } from 'rxjs/operators';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Empleado, IEmpleado } from 'app/shared/model/empleado.model';
import { IUbicacion, Ubicacion } from 'app/shared/model/ubicacion.model';
import { ActivatedRoute } from '@angular/router';
import { LocalStorage } from 'ngx-webstorage';
import { UpdateEmployeeServiceService } from 'app/core/ubication/updateEmployee.service';

@Injectable({
    providedIn: 'root'
})
export class MapaService {
    lat: number = 40.8521614;
    lng: number = 14.2681103;
    empleados: Empleado[];
    todosLosEmpleados: Empleado[];
    tipos: string[] = new Array();
    ubicaciones: IUbicacion[];

    constructor(
        public empleadoService: EmpleadoService,
        private route: ActivatedRoute,
        protected updateEmployeeService: UpdateEmployeeServiceService
    ) {}

    onAddUbication(lat: number, lng: number) {
        this.lat = lat;
        this.lng = lng;
    }

    getEmployees() {
        this.empleadoService
            .queryCustom()
            .pipe(
                filter((res: HttpResponse<IEmpleado[]>) => res.ok),
                map((res: HttpResponse<IEmpleado[]>) => res.body)
            )
            .subscribe(
                (res: IEmpleado[]) => {
                    this.empleados = res;
                    this.todosLosEmpleados = res;
                    this.getTypes(res);
                },
                (res: HttpErrorResponse) => console.log(res.message)
            );
    }

    getById(id: string) {
        this.empleadoService
            .find(id)
            .pipe(
                filter((res: HttpResponse<IEmpleado>) => res.ok),
                map((res: HttpResponse<IEmpleado>) => res.body)
            )
            .subscribe(
                (res: IEmpleado) => {
                    this.empleados.push(res);
                },
                (res: HttpErrorResponse) => console.log(res.message)
            );
    }

    getTypes(emps: IEmpleado[]) {
        emps.forEach(empleado => {
            if (!this.tipos.includes(empleado.tipo.nombreTipo)) {
                this.tipos.push(empleado.tipo.nombreTipo);
            }
        });
    }

    onTypeCliked(tipo: string) {
        if (tipo === 'todos') {
            this.empleados = this.todosLosEmpleados;
        } else {
            let emps: Empleado[] = new Array();
            this.todosLosEmpleados.forEach(empleado => {
                if (empleado.tipo.nombreTipo === tipo) {
                    emps.push(empleado);
                }
            });
            this.empleados = emps;
        }
    }

    getEmployeeById(id: string) {
        if (JSON.parse(localStorage.getItem('currentUser')) !== null) {
            this.empleados = JSON.parse(localStorage.getItem('currentUser'));
        }
        let myEmp: Empleado[] = new Array();
        this.empleados.forEach(emp => {
            if (emp.id === id) {
                myEmp.push(emp);
                this.lat = emp.ubicacion.latitud;
                this.lng = emp.ubicacion.longitud;
            }
        });
        this.empleados = myEmp;
        localStorage.setItem('currentUser', JSON.stringify(this.empleados));
    }

    setNewEmp(emp: IEmpleado) {
        for (let i = 0; i <= this.todosLosEmpleados.length; i++) {
            if (this.todosLosEmpleados[i].id === emp.id) {
                this.todosLosEmpleados[i] === emp;
            }
        }
        for (let i = 0; i <= this.empleados.length; i++) {
            if (this.empleados[i].id === emp.id) {
                this.empleados[i] === emp;
            }
        }
    }
}
