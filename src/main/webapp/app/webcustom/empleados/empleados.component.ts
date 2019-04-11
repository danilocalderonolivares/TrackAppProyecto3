import { Component, OnDestroy, OnInit } from '@angular/core';
import { MapaService } from 'app/webcustom/empleados/mapa/mapa.service';
import { IEmpleado } from 'app/shared/model/empleado.model';
import { UpdateEmployeeServiceService } from 'app/core/ubication/updateEmployee.service';

@Component({
    selector: 'jhi-empleados',
    templateUrl: './empleados.component.html',
    styles: []
})
export class EmpleadosComponent implements OnInit, OnDestroy {
    constructor(protected mapaService: MapaService, protected updateEmployeeService: UpdateEmployeeServiceService) {}

    ngOnInit() {
        this.mapaService.getEmployees();
        this.mapaService.lat = 40.8521614;
        this.mapaService.lng = 14.2681103;
        localStorage.removeItem('currentUser');
        this.updateEmployeeService.connect();
    }

    ngOnDestroy(): void {
        this.updateEmployeeService.unsubscribe();
    }
}
