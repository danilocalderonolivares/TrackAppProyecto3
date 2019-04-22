import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'app/core';
import { EmpleadoService } from 'app/entities/empleado';
import { UserCustomUser } from 'app/shared/model/user_CustomUser.model';
import { Ubicacion } from 'app/shared/model/ubicacion.model';
import { Empleado } from 'app/shared/model/empleado.model';
import { TipoEmpleado } from 'app/shared/model/tipo-empleado.model';
import { Horario } from 'app/shared/model/horario.model';

@Component({
    selector: 'jhi-user-mgmt-detail',
    templateUrl: './user-management-detail.component.html'
})
export class UserMgmtDetailComponent implements OnInit {
    user: User;
    customUser: UserCustomUser;
    authorities: any[];

    constructor(private route: ActivatedRoute, private empleadoService: EmpleadoService) {}

    ngOnInit() {
        this.setCustomUserValues();
        this.route.data.subscribe(({ user }) => {
            this.loadCustomUserData(user);
            this.customUser.user = user.body ? user.body : user;
        });
    }

    setCustomUserValues() {
        this.authorities = [];
        const ubicacion = new Ubicacion('', 1, 1, '');
        const empleados: Empleado[] = [];
        const tipoEmpleado = new TipoEmpleado('', '', empleados);
        const horario = new Horario('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', empleados);
        const empleado = new Empleado('', '', '', '', ubicacion, horario, tipoEmpleado);
        const user = new User('', '', '', '', '', true, '', this.authorities, '', new Date(), '', new Date(), '');
        this.customUser = new UserCustomUser(user, empleado);
    }

    private loadCustomUserData(user) {
        if (user.body.id !== null) {
            this.empleadoService.findUserByIdRelationship(user.body.id).subscribe(res => {
                this.customUser.empleado = res.body;
            });
        }
    }

    previousState() {
        window.history.back();
    }
}
