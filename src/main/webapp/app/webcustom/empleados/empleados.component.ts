import { Component, OnInit } from '@angular/core';
import { MapaService } from 'app/webcustom/empleados/mapa/mapa.service';
import { IEmpleado } from 'app/shared/model/empleado.model';

@Component({
    selector: 'jhi-empleados',
    templateUrl: './empleados.component.html',
    styles: []
})
export class EmpleadosComponent implements OnInit {
    constructor(protected mapaService: MapaService) {}

    ngOnInit() {
        this.mapaService.getEmployees();
        this.mapaService.lat = 40.8521614;
        this.mapaService.lng = 14.2681103;
        localStorage.removeItem('currentUser');
    }
}
