import { Publisher } from "../src/Publisher";
import { expect } from 'chai';
import { Canal } from "../src/Canal";
import { Usuario } from "../src/Usuario";

describe('Crear Publisher', () => {
    it('Creacion correcta', () => {
        var publisher = new Publisher();
        expect(publisher).to.not.equal(null);
    });
});

describe("Leer RSS y enviar notificaciones", () => {
    it("Enviar notificaciones", ()=> {
        var publisher = new Publisher();
        var canal = new Canal();
        var usuario = new Usuario("Usuario", 12345567);
        canal.subscribirse(usuario);

        (async () => {
            publisher.crearYenviarNotificacion(canal);
            expect(usuario.getNotificaciones().length).to.be.greaterThan(0);
        }) ();
    });

    it("Solo enviar notificaciones a traves de canal", ()=> {
        var publisher = new Publisher();
        var canal = new Canal();
        var usuario = new Usuario("Usuario", 12345567);
        
        (async () => {
            publisher.crearYenviarNotificacion(canal);
            expect(usuario.getNotificaciones().length).to.be.equal(0);
        }) ();
    });

});