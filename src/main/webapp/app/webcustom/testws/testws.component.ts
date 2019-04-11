import { Component, OnDestroy, OnInit } from '@angular/core';
import { IEmpleado } from 'app/shared/model/empleado.model';
import { EmpleadoService } from 'app/entities/empleado';
import { filter, map } from 'rxjs/operators';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { IUbicacion, Ubicacion } from 'app/shared/model/ubicacion.model';
import { UpdateEmployeeServiceService } from 'app/core/ubication/updateEmployee.service';

@Component({
    selector: 'jhi-testws',
    templateUrl: './testws.component.html',
    styles: []
})
export class TestwsComponent implements OnInit, OnDestroy {
    empleado: IEmpleado;
    ubicacion: IUbicacion = new Ubicacion();

    constructor(private empleadoService: EmpleadoService, private updateEmployeeService: UpdateEmployeeServiceService) {}

    ngOnInit() {
        this.empleadoService
            .find('5c9ab39363fb7f1acc0d5cc1')
            .pipe(
                filter((res: HttpResponse<IEmpleado>) => res.ok),
                map((res: HttpResponse<IEmpleado>) => res.body)
            )
            .subscribe(
                (res: IEmpleado) => {
                    this.empleado = res;
                    console.log(this.empleado.apellidos);
                },
                (res: HttpErrorResponse) => console.log(res.message)
            );
        this.updateEmployeeService.connect();
    }

    ngOnDestroy(): void {
        this.updateEmployeeService.unsubscribe();
    }

    saveUbication() {
        let myEmp = this.empleado;
        myEmp.ubicacion = this.ubicacion;
        this.updateEmployeeService.sendEmployee(myEmp);
    }
}
