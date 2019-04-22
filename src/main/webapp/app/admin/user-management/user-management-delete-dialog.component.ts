import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { User, UserService } from 'app/core';
import { EmpleadoService } from 'app/entities/empleado';
import { Empleado } from 'app/shared/model/empleado.model';
import { Tarea } from 'app/shared/model/tarea.model';

@Component({
    selector: 'jhi-user-mgmt-delete-dialog',
    templateUrl: './user-management-delete-dialog.component.html'
})
export class UserMgmtDeleteDialogComponent implements OnInit {
    user: User;
    mensajeMostrar: string;
    botonEliminar: boolean;
    dependencies: boolean;

    ngOnInit() {
        this.dependencies = false;
        this.confirmDelete(this.user);
    }

    constructor(
        private empleadoService: EmpleadoService,
        private userService: UserService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    setValuesToShow() {
        if (this.dependencies) {
            this.mensajeMostrar = 'Existen dependencias para este usuario (tareas), primero eliminelas o reasignelas para poder eliminarlo';
            this.botonEliminar = true;
        } else {
            this.mensajeMostrar =
                'Esta seguro que desea eliminar este usuario?, si lo hace eliminara sus historiales de conversaciones con todos los usuarios';
            this.botonEliminar = false;
        }
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(user: User) {
        this.verifyUserDependencies(user);
    }

    verifyUserDependencies(user: User) {
        this.empleadoService.findUserByIdRelationship(user.id).subscribe(res => {
            this.searchForDependencies(res.body as Empleado);
        });
    }

    searchForDependencies(empleado: Empleado) {
        this.empleadoService.findTasksByEmployee(empleado.id).subscribe(res => {
            this.setDependenciesValue(res);
        });
    }

    setDependenciesValue(data) {
        let userTasks: Tarea[];
        userTasks = data.body;
        if (userTasks.length > 0) {
            this.dependencies = true;
        }
        this.setValuesToShow();
    }

    deleteUser(user: User) {
        this.userService.delete(user.login).subscribe(response => {
            this.eventManager.broadcast({
                name: 'userListModification',
                content: 'Deleted a user'
            });
            this.activeModal.dismiss(true);
        });

        this.empleadoService.deleteByIdRelacion(user.id).subscribe(res => {
            console.log(res);
        });
    }
}
