import { Publisher } from "../src/Publisher";
import { expect } from 'chai';
import { Canal } from "../src/Canal";
import { Usuario } from "../src/Usuario";

describe('Crear Publisher', () => {
    it('Creacion correcta', () => {
        let publisher = new Publisher();
        expect(publisher).to.not.equal(null);
    });
});

describe("Leer RSS y enviar notificaciones", () => {
    it("Enviar notificaciones", ()=> {
        let publisher = new Publisher();
        let canal = new Canal();
        let usuario = new Usuario("Usuario", 12345567);
        canal.subscribirse(usuario);

        (async () => {
            publisher.crearYenviarNotificacion(canal);
            expect(usuario.getNotificaciones().length).to.greaterThan(0);
        }) ();
    });

    it("Solo enviar notificaciones a traves de canal", ()=> {
        let publisher = new Publisher();
        let canal = new Canal();
        let usuario = new Usuario("Usuario", 12345567);
        
        (async () => {
            publisher.crearYenviarNotificacion(canal);
            expect(usuario.getNotificaciones().length).to.equal(0);
        }) ();
    });

    it("Usuarios de otros canales no deben recibir notificaciones", ()=> {
        let publisher = new Publisher();
        let canal1 = new Canal();
        let canal2 = new Canal();
        let usuario1 = new Usuario("Usuario", 12345567);
        let usuario2 = new Usuario("Usuario2", 76544321);

        canal1.subscribirse(usuario1);
        canal2.subscribirse(usuario2);

        (async () => {
            publisher.crearYenviarNotificacion(canal2);
            expect(usuario1.getNotificaciones().length).to.equal(null);
        }) ();
    });

    it("No se deben enviar notifiaciones que ya fueron enviadas", ()=> {
        let publisher = new Publisher();
        let canal = new Canal();
        let usuario = new Usuario("Usuario", 12345567);
        canal.subscribirse(usuario);
        
        (async () => {
            // envio n°1
            publisher.crearYenviarNotificacion(canal);
            // envio n°2
            publisher.crearYenviarNotificacion(canal);
            expect(usuario.getNotificaciones().length).to.greaterThan(5);
        }) ();
    });
});