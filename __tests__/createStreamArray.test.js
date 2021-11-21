const createStreamArray = require('../src/createStreamArray');
const AdbashStream = require('../src/AdbashStream');
const CaesarCipherStream = require('../src/CaesarCipherStream');
const ROT8 = require('../src/ROT8Stream');

describe('Check transform stream creating: ', () => {
    it('Config error', () => {
        expect(() => {
            createStreamArray('D');
        }).toThrow();
    });
    it('Create stream array', () => {
        expect(createStreamArray('A-C0-C1-R0-R1')[0]).toBeInstanceOf(AdbashStream);
        expect(createStreamArray('A-C0-C1-R0-R1')[1]).toBeInstanceOf(CaesarCipherStream);
        expect(createStreamArray('A-C0-C1-R0-R1')[2]).toBeInstanceOf(CaesarCipherStream);
        expect(createStreamArray('A-C0-C1-R0-R1')[3]).toBeInstanceOf(ROT8);
        expect(createStreamArray('A-C0-C1-R0-R1')[4]).toBeInstanceOf(ROT8);
    });
});