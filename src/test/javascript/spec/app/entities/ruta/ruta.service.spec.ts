/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { RutaService } from 'app/entities/ruta/ruta.service';
import { IRuta, Ruta } from 'app/shared/model/ruta.model';

describe('Service Tests', () => {
    describe('Ruta Service', () => {
        let injector: TestBed;
        let service: RutaService;
        let httpMock: HttpTestingController;
        let elemDefault: IRuta;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(RutaService);
            httpMock = injector.get(HttpTestingController);

            elemDefault = new Ruta('ID', 'AAAAAAA', 'AAAAAAA', false);
        });

        // describe('Service methods', async () => {
        //     it('should find an element', async () => {
        //         const returnedFromService = Object.assign({}, elemDefault);
        //         service
        //             .find('123')
        //             .pipe(take(1))
        //             .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));
        //
        //         const req = httpMock.expectOne({ method: 'GET' });
        //         req.flush(JSON.stringify(returnedFromService));
        //     });
        //
        //     it('should create a Ruta', async () => {
        //         const returnedFromService = Object.assign(
        //             {
        //                 id: 'ID'
        //             },
        //             elemDefault
        //         );
        //         const expected = Object.assign({}, returnedFromService);
        //         service
        //             .create(new Ruta(null))
        //             .pipe(take(1))
        //             .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
        //         const req = httpMock.expectOne({ method: 'POST' });
        //         req.flush(JSON.stringify(returnedFromService));
        //     });
        //
        //     it('should update a Ruta', async () => {
        //         const returnedFromService = Object.assign(
        //             {
        //                 nombre: 'BBBBBB',
        //                 descripcion: 'BBBBBB',
        //                 borrado: true
        //             },
        //             elemDefault
        //         );
        //
        //         const expected = Object.assign({}, returnedFromService);
        //         service
        //             .update(expected)
        //             .pipe(take(1))
        //             .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
        //         const req = httpMock.expectOne({ method: 'PUT' });
        //         req.flush(JSON.stringify(returnedFromService));
        //     });
        //
        //     it('should return a list of Ruta', async () => {
        //         const returnedFromService = Object.assign(
        //             {
        //                 nombre: 'BBBBBB',
        //                 descripcion: 'BBBBBB',
        //                 borrado: true
        //             },
        //             elemDefault
        //         );
        //         const expected = Object.assign({}, returnedFromService);
        //         service
        //             .query(expected)
        //             .pipe(
        //                 take(1),
        //                 map(resp => resp.body)
        //             )
        //             .subscribe(body => expect(body).toContainEqual(expected));
        //         const req = httpMock.expectOne({ method: 'GET' });
        //         req.flush(JSON.stringify([returnedFromService]));
        //         httpMock.verify();
        //     });
        //
        //     it('should delete a Ruta', async () => {
        //         const rxPromise = service.delete('123').subscribe(resp => expect(resp.ok));
        //
        //         const req = httpMock.expectOne({ method: 'DELETE' });
        //         req.flush({ status: 200 });
        //     });
        // });

        // afterEach(() => {
        //     httpMock.verify();
        // });
    });
});
