import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { TestwsComponent } from 'app/webcustom/testws/testws.component';

const TESTWS_ROUTE: Routes = [
    {
        path: 'testws',
        component: TestwsComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'testws'
        },
        canActivate: [UserRouteAccessService]
    }
];

@NgModule({
    imports: [RouterModule.forChild(TESTWS_ROUTE)],
    exports: [RouterModule]
})
export class GpsAppRoutingTestws {}
