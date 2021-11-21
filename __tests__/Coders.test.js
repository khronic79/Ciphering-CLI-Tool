const Coder = require('../src/Coders');

describe('Coders testing', () => {
    it('caesarCipherCoder testing shift = 1', () => {
        expect(Coder.caesarCipherCoder('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 1)).toBe('bcdefghijklmnopqrstuvwxyzaBCDEFGHIJKLMNOPQRSTUVWXYZA');
    });
    it('caesarCipherCoder testing shift = 1', () => {
        expect(Coder.caesarCipherCoder('abcdefghijklmnopqrstuvwxyz', 1)).toBe('bcdefghijklmnopqrstuvwxyza');
    });
    it('caesarCipherCoder testing shift = -1', () => {
        expect(Coder.caesarCipherCoder('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 1, 'decode')).toBe('zabcdefghijklmnopqrstuvwxyZABCDEFGHIJKLMNOPQRSTUVWXY');
    });
    it('caesarCipherCoder testing shift = -1', () => {
        expect(Coder.caesarCipherCoder('abcdefghijklmnopqrstuvwxyz', 1, 'decode')).toBe('zabcdefghijklmnopqrstuvwxy');
    });
    it('caesarCipherCoder testing shift = 8', () => {
        expect(Coder.caesarCipherCoder('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 8)).toBe('ijklmnopqrstuvwxyzabcdefghIJKLMNOPQRSTUVWXYZABCDEFGH');
    });
    it('caesarCipherCoder testing shift = -8', () => {
        expect(Coder.caesarCipherCoder('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 8, 'decode')).toBe('stuvwxyzabcdefghijklmnopqrSTUVWXYZABCDEFGHIJKLMNOPQR');
    });
    it('atbashCipherCoder testing', () => {
        expect(Coder.atbashCipherCoder('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')).toBe('zyxwvutsrqponmlkjihgfedcbaZYXWVUTSRQPONMLKJIHGFEDCBA');
    });
});