import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEmpleado } from 'app/shared/model/empleado.model';
import { UserService } from 'app/core';

type EntityResponseType = HttpResponse<IEmpleado>;
type EntityArrayResponseType = HttpResponse<any>;
// Se cambio IEmpleado[] por any, para que el método getEmployeesCustom funcionara apropiadamente

@Injectable({ providedIn: 'root' })
export class EmpleadoService {
    public resourceUrl = SERVER_API_URL + 'api/empleados';

    constructor(protected http: HttpClient, private userService: UserService) {}

    create(empleado: IEmpleado): Observable<EntityResponseType> {
        return this.http.post<IEmpleado>(this.resourceUrl, empleado, { observe: 'response' });
    }

    update(empleado: IEmpleado): Observable<EntityResponseType> {
        return this.http.put<IEmpleado>(this.resourceUrl, empleado, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<IEmpleado>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEmpleado[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    findUserByIdRelationship(id: string): Observable<EntityResponseType> {
        const test = this.http.get<IEmpleado>(`${this.resourceUrl + '/findByRelationshipId'}/${id}`, { observe: 'response' });
        return test;
    }

    findUserByIdType(id: string): Observable<EntityArrayResponseType> {
        return this.http.get<IEmpleado[]>(`${this.resourceUrl + '/findByTypeId'}/${id}`, { observe: 'response' });
    }

    findUserByIdSchedule(id: string): Observable<EntityArrayResponseType> {
        return this.http.get<IEmpleado[]>(`${this.resourceUrl + '/findByScheduleId'}/${id}`, { observe: 'response' });
    }

    deleteByIdRelacion(id: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl + '/deleteByRelationId'}/${id}`, { observe: 'response' });
    }

    // get all employees custom
    queryCustom(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEmpleado[]>(this.resourceUrl + '-custom', { params: options, observe: 'response' });
    }

    getEmployeesByApproximation(name: string): Observable<EntityArrayResponseType> {
        return this.http.get<IEmpleado[]>(`${this.resourceUrl + '/get-by-approximation'}/${name}`, { observe: 'response' });
    }
}
