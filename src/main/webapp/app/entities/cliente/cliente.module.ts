import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GpsAppSharedModule } from 'app/shared';
import {
    ClienteComponent,
    ClienteDetailComponent,
    ClienteUpdateComponent,
    ClienteDeletePopupComponent,
    ClienteDeleteDialogComponent,
    clienteRoute,
    clientePopupRoute
} from './';
import { AgmCoreModule } from '@agm/core';

const ENTITY_STATES = [...clienteRoute, ...clientePopupRoute];

@NgModule({
    imports: [
        GpsAppSharedModule,
        RouterModule.forChild(ENTITY_STATES),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyCyVrHRb3_HIueNx4GBBJFAWAfSg1GqVj8'
        })
    ],
    declarations: [
        ClienteComponent,
        ClienteDetailComponent,
        ClienteUpdateComponent,
        ClienteDeleteDialogComponent,
        ClienteDeletePopupComponent
    ],
    entryComponents: [ClienteComponent, ClienteUpdateComponent, ClienteDeleteDialogComponent, ClienteDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GpsAppClienteModule {}
