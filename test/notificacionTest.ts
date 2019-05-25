import { Notificacion } from '../src/Notificacion';
import { expect } from 'chai';

describe('Notificacion', () => {
 
    it('Test ID', () => {
    
        let notificacion = new Notificacion('','',123,'',false,'');
       expect(notificacion.getId()).to.equal(123);

    }); 
});