import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { GpsAppSharedModule } from 'app/shared';
import { TestwsComponent } from 'app/webcustom/testws/testws.component';
import { GpsAppRoutingTestws } from 'app/webcustom/testws/testws.route';

@NgModule({
    imports: [GpsAppSharedModule, GpsAppRoutingTestws],
    declarations: [TestwsComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GPSAppTestwsModule {}
