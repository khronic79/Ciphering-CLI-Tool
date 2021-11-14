const Transform = require('stream').Transform;
const Coders = require('./Coders');

class AdbashStream extends Transform {
    constructor() {
        super();
    }
  
    _transform (chunk, encoding, callback) {
        this.push(Coders.atbashCipherCoder(chunk.toString()));
        callback();
    }
}

module.exports = AdbashStream;