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
        expect(usuario.getNotificaciones().length).to.be.greaterThan(0);
    });

    it("Solo enviar notificaciones a traves de canal", async ()=> {
        let publisher = new Publisher();
        let canal = new Canal();
        let usuario = new Usuario("Usuario", 12345567);
        
        await publisher.crearYenviarNotificacion(canal);
        expect(usuario.getNotificaciones().length).to.be.equal(0);
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
});