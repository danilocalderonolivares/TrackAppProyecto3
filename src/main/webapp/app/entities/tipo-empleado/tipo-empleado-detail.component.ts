import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITipoEmpleado } from 'app/shared/model/tipo-empleado.model';

@Component({
    selector: 'jhi-tipo-empleado-detail',
    templateUrl: './tipo-empleado-detail.component.html'
})
export class TipoEmpleadoDetailComponent implements OnInit {
    tipoEmpleado: ITipoEmpleado;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ tipoEmpleado }) => {
            this.tipoEmpleado = tipoEmpleado;
        });
    }

    previousState() {
        window.history.back();
    }
}
