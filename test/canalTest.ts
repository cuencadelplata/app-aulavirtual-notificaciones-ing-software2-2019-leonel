import { Canal } from '../src/Canal';
import { expect } from 'chai';

describe('Crear Canal', () => {
    it('Canal not null', () => {
        let canal = new Canal();
        expect(canal != null).to.equal(true);
    });
});
