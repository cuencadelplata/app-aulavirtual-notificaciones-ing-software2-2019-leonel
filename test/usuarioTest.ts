import { Notificacion } from '../src/Notificacion';
import { Usuario } from '../src/Usuario';
import { expect } from 'chai';
import moment = require("moment");
import { Canal } from '../src/Canal';

describe('Usuario', () => {
 
    it('Test Constructor Usuario', () => {
    
        let usuario = new Usuario('Agustín Aguirre Ruíz Díaz',41038330);

        expect(usuario.getNombre()).to.equal("Agustín Aguirre Ruíz Díaz");

        expect(usuario.getDni()).to.equal(41038330);


    }); 
    it('Test Agregar Notificacion Usuario', () => {
    
        let usuario = new Usuario('Agustín Aguirre Ruíz Díaz',41038330);
        var fecha = moment('2016-01-01');
        let notificacion = new Notificacion('','',123,fecha,'');

        expect(usuario.getNotificaciones().length).to.equal(0);

        usuario.agregarNotificacion(notificacion);

        expect(usuario.getNotificaciones().length).to.equal(1);
        
        


    }); 

    it('Test Eliminar por ID', () => {
        
        let usuario = new Usuario('Agustín Aguirre Ruíz Díaz',41038330);
        var fecha1 = moment('2016-01-01');
        var fecha2 = moment('2016-02-02');
        var fecha3 = moment('2016-03-03')
        let notificacion1 = new Notificacion('Esta es un título1.','Esto es una descripción1.',123,fecha1,'Agustín Aguirre Ruíz Díaz.');
        let notificacion3 = new Notificacion('Esta es un título3.','Esto es una descripción3.',191919,fecha1,'Julio Cesar Blanco.');
        let notificacion2 = new Notificacion('Esta es un título2.','Esto es una descripción2.',456,fecha2,'Nombre de Remitente2.');
        let notificacion4 = new Notificacion('Esta es un título4.','Esto es una descripción4.',191911,fecha3,'Julio Cesar Blanco.');
        let notificacion5 = new Notificacion('Esta es un título5.','Esto es una descripción5.',789,fecha1,'Julio Cesar Blanco.');
        

        usuario.agregarNotificacion(notificacion1);        
        usuario.agregarNotificacion(notificacion2);
        usuario.agregarNotificacion(notificacion3);
        usuario.agregarNotificacion(notificacion4);
        usuario.agregarNotificacion(notificacion5);

        expect(usuario.getNotificaciones().length).to.equal(5);
        expect(usuario.getNotificaciones()[3].getId()).to.equal(191911);
        usuario.eliminar(191911);
        expect(usuario.getNotificaciones().length).to.equal(4);
        expect(usuario.getNotificaciones()[3].getId()).to.not.equal(191911);
    });

    it("Subscribir usuario a un canal", () => {
        let usuario = new Usuario("Persona 1", 32232323);
        let canal = new Canal();

        usuario.subscribirse(canal);

        expect(canal.getUsuarios().length).to.equal(1);
    });

    
    it("Subscribir usuario a un canal", () => {
        let usuario = new Usuario("Persona 1", 32232323);
        let canal = new Canal();

        usuario.subscribirse(canal);

        expect(canal.getUsuarios().length).to.equal(1);

        usuario.desubscribirse(canal);

        expect(canal.getUsuarios().length).to.equal(0);
    });
});


describe('Usuario > Mostrar Notificaciones', () => {

    it('Test Mostrar 0 Notificaciones', () => {

        let usuario = new Usuario('Agustín Aguirre Ruíz Díaz', 41038330);
        expect(usuario.mostrar([])).to.equal('Sin Datos');
    });

    it('Test Mostrar 1 Notificacion', () => {

        let usuario = new Usuario('Agustín Aguirre Ruíz Díaz', 41038330);
        let n1 = new Notificacion('Esta es un título1.', 'Esto es una descripción1.', 1111, moment('2016-01-01'), 'Agustín Aguirre Ruíz Díaz.');
       
        let esperado = `1) ${n1.getTitulo()} por ${n1.getRemitente()}`;
        expect(usuario.mostrar([n1])).to.equal('1) Esta es un título1. por Agustín Aguirre Ruíz Díaz.');
    });

    it('Test Mostrar 2 Notificaciones', () => {

        let usuario = new Usuario('Agustín Aguirre Ruíz Díaz', 41038330);
        let n1 = new Notificacion('Esta es un título1.', 'Esto es una descripción1.', 1111, moment('2016-01-01'), 'Agustín Aguirre Ruíz Díaz.');
        let n2 = new Notificacion('Esta es un título2.', 'Esto es una descripción2.', 2222, moment('2016-01-01'), 'Jose A.');

        let esperado = `1) ${n1.getTitulo()} por ${n1.getRemitente()}\n2) ${n2.getTitulo()} por ${n2.getRemitente()}`;
        expect(usuario.mostrar([n1, n2])).to.equal(esperado);
    });
});


describe('Usuario > Filtrar Notificaciones', () => {

    it('Filtrar por Fecha', () => {

        let usuario = new Usuario('Agustín Aguirre Ruíz Díaz', 41038330);
        var fecha1 = moment('2016-01-01');
        var fecha2 = moment('2016-02-02');
        let notificacion1 = new Notificacion('Esta es un título1.', 'Esto es una descripción1.', 1111, fecha1, 'Agustín Aguirre Ruíz Díaz.');
        let notificacion3 = new Notificacion('Esta es un título3.', 'Esto es una descripción3.', 2222, fecha1, 'Julio Cesar Blanco.');
        let notificacion2 = new Notificacion('Esta es un título2.', 'Esto es una descripción2.', 3333, fecha2, 'Jose A.');



        usuario.agregarNotificacion(notificacion1);
        usuario.agregarNotificacion(notificacion2);
        usuario.agregarNotificacion(notificacion3);

        expect(usuario.filtrarFecha(usuario.getNotificaciones(), '2016-01-01').length).to.equal(2);
    });

});
