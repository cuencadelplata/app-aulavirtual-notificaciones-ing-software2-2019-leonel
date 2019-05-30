import { Canal } from '../src/Canal';
import { Usuario } from '../src/Usuario';
import { expect } from 'chai';
import { Notificacion } from '../src/Notificacion';
import moment = require("moment");
import { ContenedorNotif } from '../src/ContenedorNotif';


describe('Crear Canal', () => {
    it('Canal not null', () => {
        let canal = new Canal();
        expect(canal != null).to.equal(true);
    });
});

describe('Suscripcion a Canal', () => {
    it('Usuario se Suscribe a Canal', () => {
        let canal = new Canal();
        let usuario = new Usuario('Agustín Aguirre Ruíz Díaz', 41038330);
        canal.subscribirse(usuario);
        expect(canal.getUsuarios().length).to.equal(1);
    });
    it('Usuario no debe subscribirse si ya se encuentra suscrito', () => {
        let canal = new Canal();
        let usuario = new Usuario('Agustín Aguirre Ruíz Díaz', 41038330);
        canal.subscribirse(usuario);
        expect(canal.subscribirse(usuario)).to.equal(false);
        expect(canal.getUsuarios().length).to.equal(1);
    });
    it('Usuario Nuevo debe tener notificaciones de contenedorNotif', () => {
        let canal = new Canal();
        canal.repartirNotificacion(new Notificacion('Titulo', 'Descripcion', 213, moment('2016-01-01'), 'Schleicher Leonel'));
        canal.repartirNotificacion(new Notificacion('Titulo2', 'Descripcion2', 2134, moment(), 'Schleicher Leonel'));
        let usuario = new Usuario('Agustín Aguirre Ruíz Díaz', 41038330);
        canal.subscribirse(usuario);
        expect(canal.getUsuarios()[0].getNotificaciones().length).to.equal(2);
    });


});
describe('Desuscripcion del Canal', () => {
    it('Usuario se Desuscribe a Canal', () => {
        let canal = new Canal();
        let usuario = new Usuario('Agustín Aguirre Ruíz Díaz', 41038330);
        let usuario2 = new Usuario('Usuario2', 12345678);
        canal.subscribirse(usuario);
        canal.subscribirse(usuario2);
        canal.desuscribirse(usuario);
        expect(canal.getUsuarios().length).to.equal(1);
    });

});
    
describe('Repartir Notificaciones', () => {
    it('Usuario que no es remitente recibe la notificacion', () => {
    
        var fecha = moment('2016-01-01');
               
        let canal = new Canal();
        let user = new Usuario('Usuario',1);
    
        canal.subscribirse(user);
        user.eliminar(213);
        user.eliminar(2134);
    
        let notificacion = new Notificacion('Titulo','Descripcion',223,fecha,'Augusto Portillo');
        canal.repartirNotificacion(notificacion);
        expect(user.getNotificaciones().length).to.equals(1);
      
           
    });

    it('Usuario que es remitente no recibe la notificacion', () => {
     
        var fecha = moment('2016-01-01');
               
        let canal = new Canal();
        let user = new Usuario('Schleicher',1);
    
        canal.subscribirse(user);
        user.eliminar(213);
        user.eliminar(2134);
        user.eliminar(223);
    
        let notificacion = new Notificacion('Titulo','Descripcion',220,fecha,'Schleicher');
        canal.repartirNotificacion(notificacion);
        expect(user.getNotificaciones().length).to.equals(0);
      
           
    });

    it('Cuando el canal reparte, tambien lo hace al contenedor', () => {
       
        var fecha = moment('2016-01-01');
        
        let canal = new Canal();
        canal.getContenedorNotificacion().reset();   
        let notificacion = new Notificacion('Titulo','Descripcion',213,fecha,'Schleicher Leonel');
        canal.repartirNotificacion(notificacion);
        expect(canal.getContenedorNotificacion().getNotificaciones().length).to.equals(1);
        
           
    });

    
    
});