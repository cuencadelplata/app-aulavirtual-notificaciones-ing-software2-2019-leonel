import { Canal } from '../src/Canal';
import { Usuario } from '../src/Usuario';
import { expect } from 'chai';
import { ContenedorNotif } from '../src/ContenedorNotificacion';
import { Notificacion } from '../src/Notificacion';
import moment = require("moment");


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
    });

});
describe('Desuscricion del Canal', () => {
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
        var contenedorNoti
        var fecha = moment('2016-01-01');
               
        let canal = new Canal();
    
            canal.subscribirse(new Usuario('Usuario',1));
    
        let notificacion = new Notificacion('Titulo','Descripcion',213,fecha,'Augusto Portillo');
        canal.repartirNotificacion(notificacion);
        canal.getUsuarios().forEach(user => {
            expect(user.getNotificaciones().length).to.equals(1);
        })
           
    });
    
});