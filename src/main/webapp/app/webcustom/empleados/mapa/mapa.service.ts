import { Injectable } from '@angular/core';
import { Empleado } from 'app/webcustom/empleados/mapa/empleado.model';
import { Ubicacion } from 'app/webcustom/empleados/mapa/ubicacion';

@Injectable({
    providedIn: 'root'
})
export class MapaService {
    lat: number = 40.8521614;
    lng: number = 14.2681103;
    empleados: Empleado[];

    // Lista se consigue por medio get a empleados.

    getEmpleados: Empleado[] = [
        new Empleado(
            '1',
            'Giorno',
            'Giovanna',
            'entregar hija al jefe',
            'ganster',
            new Ubicacion('napoles', 40.8522705686774, 14.267114996910095)
        ),
        new Empleado(
            '2',
            'Bruno',
            'Bucciarati',
            'entregar hija al jefe',
            'ganster',
            new Ubicacion('napoles', 40.85037968218061, 14.26798403263092)
        ),
        new Empleado(
            '3',
            'Narancia',
            'Ghirga',
            'entregar hija al jefe',
            'ganster',
            new Ubicacion('napoles', 40.85829994503638, 14.273611307144165)
        ),
        new Empleado(
            '4',
            'Guido',
            'Mista',
            'entregar hija al jefe',
            'ganster',
            new Ubicacion('napoles', 40.842531520744195, 14.284844398498535)
        ),
        new Empleado(
            '5',
            'Leone',
            'Abbacchio',
            'entregar hija al jefe',
            'ganster',
            new Ubicacion('napoles', 40.849401756191156, 14.2540043592453)
        ),
        new Empleado('6', 'Koichi', 'Hirose', 'detener stands', 'Japones', new Ubicacion('Roma', 35.27785716153034, 135.51303148269653)),
        new Empleado('7', 'Jotaro', 'Kujo', 'detener stands', 'Japones', new Ubicacion('Roma', 35.27790971312371, 135.51577806472778)),
        new Empleado('8', 'Josuke', 'Higashikata', 'detener stands', 'Japones', new Ubicacion('Roma', 35.26485835360338, 135.4906940460205))
    ];

    onAddUbication(lat: number, lng: number) {
        this.lat = lat;
        this.lng = lng;
    }

    getEmployees() {
        this.empleados = this.getEmpleados;
    }

    onTypeCliked(tipo: string) {
        if (tipo === 'todos') {
            this.empleados = this.getEmpleados;
        } else {
            let emp: Empleado[] = new Array();
            this.getEmpleados.forEach(empleado => {
                if (empleado.tipo === tipo) {
                    emp.push(empleado);
                }
            });
            this.empleados = emp;
        }
    }

    getEmployeeById(id: string) {
        let myEmp: Empleado[] = new Array();
        this.getEmpleados.forEach(emp => {
            if (emp.id === id) {
                myEmp.push(emp);
                this.lat = emp.ubicacion.lat;
                this.lng = emp.ubicacion.lng;
            }
        });
        this.empleados = myEmp;
    }
}
