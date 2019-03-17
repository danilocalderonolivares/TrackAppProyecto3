import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITipoEmpleado } from 'app/shared/model/tipo-empleado.model';

type EntityResponseType = HttpResponse<ITipoEmpleado>;
type EntityArrayResponseType = HttpResponse<ITipoEmpleado[]>;

@Injectable({ providedIn: 'root' })
export class TipoEmpleadoService {
    public resourceUrl = SERVER_API_URL + 'api/tipo-empleados';

    constructor(protected http: HttpClient) {}

    create(tipoEmpleado: ITipoEmpleado): Observable<EntityResponseType> {
        return this.http.post<ITipoEmpleado>(this.resourceUrl, tipoEmpleado, { observe: 'response' });
    }

    update(tipoEmpleado: ITipoEmpleado): Observable<EntityResponseType> {
        return this.http.put<ITipoEmpleado>(this.resourceUrl, tipoEmpleado, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<ITipoEmpleado>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITipoEmpleado[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
