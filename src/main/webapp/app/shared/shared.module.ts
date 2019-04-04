import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { NgbDateMomentAdapter } from './util/datepicker-adapter';
import { GpsAppSharedLibsModule, GpsAppSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';
import { MapComponent } from './map/map.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { AgmCoreModule } from '@agm/core';

@NgModule({
    imports: [
        GpsAppSharedLibsModule,
        GpsAppSharedCommonModule,
        GooglePlaceModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyA6qPYcS3xkzoGTXEeljg5g_CE3m0wBTlI',
            libraries: ['places']
        })
    ],
    declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective, MapComponent],
    providers: [{ provide: NgbDateAdapter, useClass: NgbDateMomentAdapter }],
    entryComponents: [JhiLoginModalComponent],
    exports: [GpsAppSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective, MapComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GpsAppSharedModule {
    static forRoot() {
        return {
            ngModule: GpsAppSharedModule
        };
    }
}
