import { Notificacion } from '../src/Notificacion';
import { Usuario } from '../src/Usuario';
import { expect } from 'chai';

describe('Usuario', () => {
 
    it('Test Constructor', () => {
    
        let usuario = new Usuario('Agustín Aguirre Ruíz Díaz',41038330);

        expect(usuario.getNombre()).to.equal("Agustín Aguirre Ruíz Díaz");

        expect(usuario.getDni()).to.equal(41038330);


    }); 
});