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
    it("Enviar notificaciones", async ()=> {
        let publisher = new Publisher();
        let canal = new Canal();
        let usuario = new Usuario("Usuario", 12345567);
        canal.subscribirse(usuario);

        await publisher.crearYenviarNotificacion(canal);
        expect(usuario.getNotificaciones().length).to.be.greaterThan(5);
    });

    it("Solo enviar notificaciones a traves de canal", async ()=> {
        let publisher = new Publisher();
        let canal = new Canal();
        let usuario = new Usuario("Usuario", 12345567);
        
        await publisher.crearYenviarNotificacion(canal);
        expect(usuario.getNotificaciones().length).to.be.equal(0);
    });

    it("Usuarios de otros canales no deben recibir notificaciones", async () => {
        let publisher = new Publisher();
        let canal1 = new Canal();
        let canal2 = new Canal();
        let usuario1 = new Usuario("Usuario", 12345567);
        let usuario2 = new Usuario("Usuario2", 76544321);
        canal1.getContenedorNotificacion().reset();
        canal1.subscribirse(usuario1);
        canal2.subscribirse(usuario2);

    
        await publisher.crearYenviarNotificacion(canal2);
        expect(usuario1.getNotificaciones().length).to.equal(0);
    });

    it("No se deben enviar notifiaciones que ya fueron enviadas", async ()=> {
        let publisher = new Publisher();
        let canal = new Canal();
        let usuario = new Usuario("Usuario", 12345567);
        canal.subscribirse(usuario);
        
        // envio n°1
        await publisher.crearYenviarNotificacion(canal);
        // envio n°2
        await publisher.crearYenviarNotificacion(canal);
        expect(usuario.getNotificaciones().length).to.be.greaterThan(10);
    });

    
    it("No se deben enviar notifiaciones que fueron eliminadas", async ()=> {
        let publisher = new Publisher();
        let canal = new Canal();
        let usuario = new Usuario("Usuario", 12345567);
        canal.getContenedorNotificacion().reset();
        usuario.subscribirse(canal);
        
        // envio n°1
        await publisher.crearYenviarNotificacion(canal);
        expect(usuario.getNotificaciones().length).to.equal(11);
        // envio n°2
        // usuario.mostrar();
        usuario.eliminar(74075);
        await publisher.crearYenviarNotificacion(canal);
        expect(usuario.getNotificaciones().length).to.be.equal(10);
    });
});