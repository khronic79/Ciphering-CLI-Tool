const fileErrorsHandler = require('./errors/fileErrorHandler');
const fs = require('fs');
const Readable = require('stream').Readable;

class ReadFromFileStream extends Readable {
    constructor(filePath, options) {
        super(options);
        this.fd = null;
        this.filePath = filePath;
    }

    _construct(callback) {
        fs.open(this.filePath, (error, fd) => {
            if (error) fileErrorsHandler(error, callback)
            else {
                this.fd = fd;
                callback();
            }
        });
    }

    _read(size) {
        const buffer = Buffer.alloc(size);
        fs.read(this.fd, buffer, 0, size, null, (error, bytesRead) => {
            if (error) {
              this.destroy(error);
            } else {
              this.push(bytesRead > 0 ? buffer.slice(0, bytesRead) : null);
            }
        });
    }

    _destroy(error, callback) {
        if (this.fd) {
            fs.close(this.fd, (er) => callback(er || error));
        } else {
            callback(error);
        }
      }
}

module.exports = ReadFromFileStream;