import { ContenedorNotif } from '../src/ContenedorNotificacion';
import { expect } from 'chai';
import { Notificacion } from '../src/Notificacion';
import moment = require("moment");

describe('Almacenar notificaciones', () => {
 
    it('Cantidad de notificaciones debe ser igual a 1', () => {
        var fecha = moment('2016-01-01');
        let contenedorNotificacion = new ContenedorNotif();
        let notificacion = new Notificacion("esto es un titulo", "esto es una descripcion", 1, fecha,"soy el remitente");
        contenedorNotificacion.agregarNotificacion(notificacion);
        expect(contenedorNotificacion.getNotificacion().length).to.equal(1);

    }); 

    it('Cantidad de notificaciones no debe ser igual a 1', () => {
        var fecha = moment('2016-01-01');
        let contenedorNotificacion = new ContenedorNotif();
        let notificacion = new Notificacion("esto es un titulo", "esto es una descripcion", 1, fecha,"soy el remitente");
        contenedorNotificacion.agregarNotificacion(notificacion);
        expect(contenedorNotificacion.getNotificacion().length).to.not.equal(2);

    }); 
});