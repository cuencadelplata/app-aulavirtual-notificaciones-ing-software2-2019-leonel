import { Publisher } from "../src/Publisher";
import { expect } from 'chai';

describe('Crear Publisher', () => {
    it('Creacion correcta', () => {
        var publisher = new Publisher();
        expect(publisher).to.not.equal(null);
    });
});
