const { StreamsConfigError } = require('./errors/errors');
const AdbashStream = require('./AdbashStream');
const CaesarCipherStream = require('./CaesarCipherStream');
const ROT8 = require('./ROT8Stream');

function createStreamArray(config = '') {
    const possibleConf = ['A', 'C0', 'C1', 'R0', 'R1'];
    const streamsConf = config.split('-');
    streamsConf.forEach((conf) => {
        let check = false;
        possibleConf.forEach((poss) => {
            if (conf === poss) check = true;
        });
        if (!check) {
            throw new StreamsConfigError('Config is not valid');
        }
    });
    const streams = streamsConf.map(conf => {
        let stream;
        switch (conf) {
            case 'A': {
                stream = new AdbashStream();
                break;
            }
            case 'C0': {
                stream = new CaesarCipherStream(1, 'decode');
                break;
            }
            case 'C1': {
                stream = new CaesarCipherStream(1, 'encode');
                break;
            }
            case 'R0': {
                stream = new ROT8(8, 'decode');
                break;
            }
            case 'R1': {
                stream = new ROT8(8, 'encode');
                break;
            }
        }
        return stream;
    });
    return streams;
}

module.exports = createStreamArray;