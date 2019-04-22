import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICliente } from 'app/shared/model/cliente.model';

@Component({
    selector: 'jhi-cliente-detail',
    templateUrl: './cliente-detail.component.html'
})
export class ClienteDetailComponent implements OnInit {
    cliente: ICliente;
    empresa: boolean;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ cliente }) => {
            this.cliente = cliente;
            this.empresa = cliente.esEmpresa;
        });
    }

    previousState() {
        window.history.back();
    }
}
