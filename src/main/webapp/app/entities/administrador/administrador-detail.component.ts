import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAdministrador } from 'app/shared/model/administrador.model';

@Component({
    selector: 'jhi-administrador-detail',
    templateUrl: './administrador-detail.component.html'
})
export class AdministradorDetailComponent implements OnInit {
    administrador: IAdministrador;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ administrador }) => {
            this.administrador = administrador;
        });
    }

    previousState() {
        window.history.back();
    }
}
