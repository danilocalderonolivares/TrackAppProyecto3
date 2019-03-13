import { Route } from '@angular/router';
import { loginComponent } from './login.component';

export const loginRoute: Route = {
    path: 'login',
    component: loginComponent,
    data: {
        authorities: [],
        pageTitle: 'signin'
    }
};
