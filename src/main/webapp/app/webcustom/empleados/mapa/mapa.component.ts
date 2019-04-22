import { Component, OnInit, ViewChild } from '@angular/core';
import { MapaService } from './mapa.service';
import { MouseEvent } from '@agm/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { Empleado, IEmpleado } from 'app/shared/model/empleado.model';
import { numberOfBytes } from 'ng-jhipster/directive/number-of-bytes';

@Component({
    selector: 'jhi-mapa',
    templateUrl: './mapa.component.html',
    styleUrls: ['mapa.component.css']
})
export class MapaComponent implements OnInit {
    zoom: number = 15;
    @ViewChild('placesRef') placesRef: GooglePlaceDirective;
    myEmployees: any[] = new Array();

    constructor(protected mapaService: MapaService) {}

    ngOnInit() {}

    onChoseLocation(event) {
        this.mapaService.lat = event.coords.lat;
        this.mapaService.lng = event.coords.lng;
    }

    setLabel(nombre: string, apellido: string) {
        return nombre.charAt(0) + apellido.charAt(0);
    }

    public handleAddressChange(address: Address) {
        this.mapaService.lat = address.geometry.location.lat();
        this.mapaService.lng = address.geometry.location.lng();
    }
}
