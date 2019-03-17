import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'tarea',
                loadChildren: './tarea/tarea.module#GpsAppTareaModule'
            },
            {
                path: 'ubicacion',
                loadChildren: './ubicacion/ubicacion.module#GpsAppUbicacionModule'
            },
            {
                path: 'sub-tarea',
                loadChildren: './sub-tarea/sub-tarea.module#GpsAppSubTareaModule'
            },
            {
                path: 'cliente',
                loadChildren: './cliente/cliente.module#GpsAppClienteModule'
            },
            {
                path: 'empleado',
                loadChildren: './empleado/empleado.module#GpsAppEmpleadoModule'
            },
            {
                path: 'administrador',
                loadChildren: './administrador/administrador.module#GpsAppAdministradorModule'
            },
            {
                path: 'mensaje',
                loadChildren: './mensaje/mensaje.module#GpsAppMensajeModule'
            },
            {
                path: 'recuperacion',
                loadChildren: './recuperacion/recuperacion.module#GpsAppRecuperacionModule'
            },
            {
                path: 'ruta',
                loadChildren: './ruta/ruta.module#GpsAppRutaModule'
            },
            {
                path: 'log',
                loadChildren: './log/log.module#GpsAppLogModule'
            },
            {
                path: 'horario',
                loadChildren: './horario/horario.module#GpsAppHorarioModule'
            },
            {
                path: 'ubicacion',
                loadChildren: './ubicacion/ubicacion.module#GpsAppUbicacionModule'
            },
            {
                path: 'empleado',
                loadChildren: './empleado/empleado.module#GpsAppEmpleadoModule'
            },
            {
                path: 'mensaje',
                loadChildren: './mensaje/mensaje.module#GpsAppMensajeModule'
            },
            {
                path: 'recuperacion',
                loadChildren: './recuperacion/recuperacion.module#GpsAppRecuperacionModule'
            },
            {
                path: 'ruta',
                loadChildren: './ruta/ruta.module#GpsAppRutaModule'
            },
            {
                path: 'horario',
                loadChildren: './horario/horario.module#GpsAppHorarioModule'
            },
            {
                path: 'empleado',
                loadChildren: './empleado/empleado.module#GpsAppEmpleadoModule'
            },
            {
                path: 'empleado',
                loadChildren: './empleado/empleado.module#GpsAppEmpleadoModule'
            },
            {
                path: 'tipo-empleado',
                loadChildren: './tipo-empleado/tipo-empleado.module#GpsAppTipoEmpleadoModule'
            },
            {
                path: 'tarea',
                loadChildren: './tarea/tarea.module#GpsAppTareaModule'
            },
            {
                path: 'ubicacion',
                loadChildren: './ubicacion/ubicacion.module#GpsAppUbicacionModule'
            },
            {
                path: 'sub-tarea',
                loadChildren: './sub-tarea/sub-tarea.module#GpsAppSubTareaModule'
            },
            {
                path: 'cliente',
                loadChildren: './cliente/cliente.module#GpsAppClienteModule'
            },
            {
                path: 'empleado',
                loadChildren: './empleado/empleado.module#GpsAppEmpleadoModule'
            },
            {
                path: 'mensaje',
                loadChildren: './mensaje/mensaje.module#GpsAppMensajeModule'
            },
            {
                path: 'recuperacion',
                loadChildren: './recuperacion/recuperacion.module#GpsAppRecuperacionModule'
            },
            {
                path: 'ruta',
                loadChildren: './ruta/ruta.module#GpsAppRutaModule'
            },
            {
                path: 'log',
                loadChildren: './log/log.module#GpsAppLogModule'
            },
            {
                path: 'tipo-empleado',
                loadChildren: './tipo-empleado/tipo-empleado.module#GpsAppTipoEmpleadoModule'
            },
            {
                path: 'horario',
                loadChildren: './horario/horario.module#GpsAppHorarioModule'
            },
            {
                path: 'tarea',
                loadChildren: './tarea/tarea.module#GpsAppTareaModule'
            },
            {
                path: 'ubicacion',
                loadChildren: './ubicacion/ubicacion.module#GpsAppUbicacionModule'
            },
            {
                path: 'sub-tarea',
                loadChildren: './sub-tarea/sub-tarea.module#GpsAppSubTareaModule'
            },
            {
                path: 'cliente',
                loadChildren: './cliente/cliente.module#GpsAppClienteModule'
            },
            {
                path: 'empleado',
                loadChildren: './empleado/empleado.module#GpsAppEmpleadoModule'
            },
            {
                path: 'mensaje',
                loadChildren: './mensaje/mensaje.module#GpsAppMensajeModule'
            },
            {
                path: 'recuperacion',
                loadChildren: './recuperacion/recuperacion.module#GpsAppRecuperacionModule'
            },
            {
                path: 'ruta',
                loadChildren: './ruta/ruta.module#GpsAppRutaModule'
            },
            {
                path: 'log',
                loadChildren: './log/log.module#GpsAppLogModule'
            },
            {
                path: 'tipo-empleado',
                loadChildren: './tipo-empleado/tipo-empleado.module#GpsAppTipoEmpleadoModule'
            },
            {
                path: 'horario',
                loadChildren: './horario/horario.module#GpsAppHorarioModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GpsAppEntityModule {}
