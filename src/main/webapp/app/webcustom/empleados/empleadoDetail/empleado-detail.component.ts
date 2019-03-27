import { Component, OnInit } from '@angular/core';
import { MapaService } from 'app/webcustom/empleados/mapa/mapa.service';
import { ActivatedRoute } from '@angular/router';
import { IEmpleado } from 'app/shared/model/empleado.model';

@Component({
    selector: 'jhi-empleado',
    templateUrl: './empleado-detail.component.html',
    styles: []
})
export class EmpleadoDetailComponent implements OnInit {
    empDetail: IEmpleado;
    constructor(protected mapaService: MapaService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.mapaService.getEmployeeById(this.route.snapshot.params['id']);
    }
}
