import { ContenedorNotif } from '../src/ContenedorNotif';
import { expect } from 'chai';
import { Notificacion } from '../src/Notificacion';
import moment = require("moment");

describe('Almacenar notificaciones', () => {
    var contenedorNotificacion = ContenedorNotif.getInstance();
 
    it('Cantidad de notificaciones debe ser igual a 1', () => {
        var fecha = moment('2016-01-01');
        let notificacion = new Notificacion("esto es un titulo", "esto es una descripcion", 1, fecha,"soy el remitente");
        contenedorNotificacion.agregarNotificacion(notificacion);
        expect(contenedorNotificacion.getNotificaciones().length).to.equal(6);

    }); 

    it('Cantidad de notificaciones no debe ser igual a 1', () => {
        var fecha = moment('2016-01-01');
        let notificacion = new Notificacion("esto es un titulo", "esto es una descripcion", 1, fecha,"soy el remitente");
        contenedorNotificacion.agregarNotificacion(notificacion);
        expect(contenedorNotificacion.getNotificaciones().length).to.not.equal(2);

    });
    
    it('ContenedorNotificacion debe resetear sus notificaciones', () => {
        var fecha = moment('2016-01-01');
        let notificacion = new Notificacion("esto es un titulo", "esto es una descripcion", 1, fecha,"soy el remitente");
        contenedorNotificacion.agregarNotificacion(notificacion);
        contenedorNotificacion.reset();
        expect(contenedorNotificacion.getNotificaciones().length).to.equal(0);

    }); 
});