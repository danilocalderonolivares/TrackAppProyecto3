import { Component, OnInit } from '@angular/core';
import { MapaService } from 'app/webcustom/empleados/mapa/mapa.service';
import { Empleado } from 'app/webcustom/empleados/mapa/empleado.model';

@Component({
    selector: 'jhi-empleados',
    templateUrl: './empleados.component.html',
    styles: []
})
export class EmpleadosComponent implements OnInit {
    tipos: string[] = new Array();

    constructor(protected mapaService: MapaService) {}

    ngOnInit() {
        this.mapaService.getEmployees();
        this.setTypes();
        this.mapaService.lat = 40.8521614;
        this.mapaService.lng = 14.2681103;
    }

    setTypes() {
        this.mapaService.empleados.forEach(empleado => {
            if (!this.tipos.includes(empleado.tipo)) {
                this.tipos.push(empleado.tipo);
            }
        });
    }
}
