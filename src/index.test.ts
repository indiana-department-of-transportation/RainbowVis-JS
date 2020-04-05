import Rainbow, { rainbow } from './index';

describe('class Rainbow', () => {
    it('Should return the correct color values', () => {
        const r = new Rainbow({
            colours: ['seagreen', '#800080'],
        });

        // Checked these against the original impl.
        expect(r.colourAt(12)).toBe('387a5c');
        expect(r.colourAt(87)).toBe('75127b');
    });

    it('Should have new convenience methods', () => {
        const r = rainbow()
            .overColors('seagreen', '#800080')
            .withRange(0, 100);

        expect(r.getColor(12)).toBe('#387a5c');
        expect(r.getColor(87)).toBe('#75127b');
    });
});
