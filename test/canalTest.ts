import { Canal } from '../src/Canal';
import { Usuario } from '../src/Usuario';
import { expect } from 'chai';

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
    
});


