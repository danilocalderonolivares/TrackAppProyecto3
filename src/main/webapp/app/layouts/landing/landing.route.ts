import { Route } from '@angular/router';

import { LandingComponent } from './landing.component';

export const landingRoute: Route = {
    path: '',
    component: LandingComponent,
    outlet: 'landing'
};
