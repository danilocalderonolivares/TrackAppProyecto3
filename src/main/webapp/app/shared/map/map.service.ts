import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRuta, Ruta } from 'app/shared/model/ruta.model';
import { IUbicacion, Ubicacion } from 'app/shared/model/ubicacion.model';
import { map } from 'rxjs/operators';

type EntityResponseType = HttpResponse<IRuta>;
type EntityArrayResponseType = HttpResponse<IRuta[]>;

@Injectable({ providedIn: 'root' })
export class MapService {
    public ubication: IUbicacion;
    public ubications: Ubicacion[];
    public viewOnly = false;

    constructor(protected http: HttpClient) {
        this.ubication = new Ubicacion();
        this.ubications = new Array();
    }

    setUbication(lat: number, lng: number, address?: string) {
        this.ubication.latitud = lat;
        this.ubication.longitud = lng;
        if (address === undefined) {
            this.getAddress(lat, lng).subscribe(
                res => {
                    this.ubication.nombreDireccion = res.results[0].formatted_address;
                },
                err => {
                    console.log(err);
                }
            );
        } else {
            this.ubication.nombreDireccion = address;
        }
    }

    getAddress(lat: number, lng: number) {
        return this.http.get<any>(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${'AIzaSyCyVrHRb3_HIueNx4GBBJFAWAfSg1GqVj8'}`
        );
    }
}
