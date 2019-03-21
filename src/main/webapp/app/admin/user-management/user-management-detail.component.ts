import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from 'app/core';
import { IEmpleado } from 'app/shared/model/empleado.model';
import { EmpleadoService } from 'app/entities/empleado';

@Component({
    selector: 'jhi-user-mgmt-detail',
    templateUrl: './user-management-detail.component.html'
})
export class UserMgmtDetailComponent implements OnInit {
    user: User;
    customUser: IEmpleado;

    constructor(private route: ActivatedRoute, private empleadoService: EmpleadoService) {}

    ngOnInit() {
        this.route.data.subscribe(({ user }) => {
            this.user = user.body ? user.body : user;
        });

        this.loadCustomUserData();
    }

    private loadCustomUserData() {
        if (this.user.id !== null) {
            this.empleadoService.findUserByIdRelationship(this.user.id).subscribe(res => {
                this.customUser = res.body as IEmpleado;
            });
        }
    }
}
