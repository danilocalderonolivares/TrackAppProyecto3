import { Component, OnInit, ViewChild } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { MapService } from 'app/shared/map/map.service';

@Component({
    selector: 'jhi-map',
    templateUrl: './map.component.html',
    styleUrls: ['map.component.css']
})
export class MapComponent implements OnInit {
    lat: number = 9.932316199999999;
    lng: number = -84.03103390000001;
    latMarker: number;
    lngMarker: number;
    zoom: number = 15;
    @ViewChild('placesRef') placesRef: GooglePlaceDirective;

    constructor(protected mapService: MapService) {}

    ngOnInit() {}

    onChoseLocation(event: MouseEvent) {
        this.latMarker = event.coords.lat;
        this.lngMarker = event.coords.lng;
        this.mapService.setUbication(event.coords.lat, event.coords.lng);
    }

    setLabel(direccion: string) {
        return direccion.charAt(0) + direccion.charAt(1);
    }

    public handleAddressChange(address: Address) {
        this.lat = address.geometry.location.lat();
        this.lng = address.geometry.location.lng();
        this.latMarker = address.geometry.location.lat();
        this.lngMarker = address.geometry.location.lng();
        this.mapService.setUbication(
            address.geometry.location.lat(),
            address.geometry.location.lng(),
            address.name + ', ' + address.formatted_address
        );
    }
}
