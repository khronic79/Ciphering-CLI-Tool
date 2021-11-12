const Transform = require('stream').Transform;
const Coders = require('./Coders');

class CaesarCipherStream extends Transform {
    constructor(shift, action) {
        super();
        this.shift = shift;
        this.action = action;
    }
  
    _transform (chunk, encoding, callback) {
        this.push(Coders.caesarCipherCoder(chunk.toString(), this.shift, this.action));
        callback();
    }
}

module.exports = CaesarCipherStream;