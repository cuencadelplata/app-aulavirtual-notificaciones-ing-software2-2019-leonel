import { Notificacion } from '../src/Notificacion';
import { expect } from 'chai';

describe('Notificacion', () => {
 
    it('Test ID', () => {
    
        let notificacion = new Notificacion('','',123,'','');
       expect(notificacion.getId()).to.equal(123);

    }); 
});

describe('Notificacion', () => {
 
    it('Test Visto', () => {
    
        let notificacion = new Notificacion('','',123,'','');
       notificacion.cambiarVisto;
        expect(notificacion.getVisto()).to.equal(false);

    }); 
});