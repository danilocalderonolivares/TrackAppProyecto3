import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICliente } from 'app/shared/model/cliente.model';
type EntityResponseType = HttpResponse<ICliente>;
type EntityArrayResponseType = HttpResponse<ICliente[]>;

@Injectable({ providedIn: 'root' })
export class ClienteService {
    public resourceUrl = SERVER_API_URL + 'api/clientes';
    public resourceUrlCela = SERVER_API_URL + 'api/find';
    private googleMapsKey: 'AIzaSyCyVrHRb3_HIueNx4GBBJFAWAfSg1GqVj8';

    constructor(protected http: HttpClient) {}

    create(cliente: ICliente): Observable<EntityResponseType> {
        return this.http.post<ICliente>(this.resourceUrl, cliente, { observe: 'response' });
    }

    update(cliente: ICliente): Observable<EntityResponseType> {
        return this.http.put<ICliente>(this.resourceUrl, cliente, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<ICliente>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICliente[]>(this.resourceUrl, { params: options, observe: 'response' });
    }
    findbyCedula(cedula: string) {
        return this.http.get<ICliente>(`${this.resourceUrlCela}/${cedula}`, { observe: 'response' });
    }
    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
    getAddress(lat: number, lng: number) {
        return this.http.get<any>(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${'AIzaSyCyVrHRb3_HIueNx4GBBJFAWAfSg1GqVj8'}`
        );
    }
}
