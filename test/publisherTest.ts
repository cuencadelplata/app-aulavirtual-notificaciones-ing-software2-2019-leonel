import { Publisher } from "../src/Publisher";
import { expect } from 'chai';
import { Canal } from "../src/Canal";
import { Usuario } from "../src/Usuario";
import { CANCELLED } from "dns";

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

    it("Usuarios de otros canales no deben recibir notificaciones", ()=> {
        var publisher = new Publisher();
        var canal1 = new Canal();
        var canal2 = new Canal();
        var usuario = new Usuario("Usuario", 12345567);
        
        canal1.subscribirse(usuario);

        (async () => {
            publisher.crearYenviarNotificacion(canal2);
            expect(usuario.getNotificaciones().length).to.be.equal(0);
        }) ();
    });

    it("No se deben enviar notifiaciones que ya fueron enviadas", ()=> {
        var publisher = new Publisher();
        var canal = new Canal();
        var usuario = new Usuario("Usuario", 12345567);
        canal.subscribirse(usuario);
        
        (async () => {
            // envio n°1
            publisher.crearYenviarNotificacion(canal);
            // envio n°2
            publisher.crearYenviarNotificacion(canal);
            expect(usuario.getNotificaciones().length).to.be.greaterThan(10);
        }) ();
    });
});