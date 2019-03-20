import { Component, OnInit } from '@angular/core';
import { MapaService } from 'app/webcustom/empleados/mapa/mapa.service';
import { Empleado } from 'app/webcustom/empleados/mapa/empleado.model';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'jhi-empleado',
    templateUrl: './empleado-detail.component.html',
    styles: []
})
export class EmpleadoDetailComponent implements OnInit {
    empDetail: Empleado;
    constructor(protected mapaService: MapaService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.mapaService.getEmployeeById(this.route.snapshot.params['id']);
    }
}
