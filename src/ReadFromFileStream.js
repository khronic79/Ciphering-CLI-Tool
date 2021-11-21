const { FilesExistingError } = require('./errors/errors');
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
            if (error) {
                if (error.code === 'ENOENT') {
                    const customError = new FilesExistingError('File or path does not exit');
                    callback(customError);
                } else {
                    callback(error);
                }
            }
            else {
                this.fd = fd;
                callback();
            }
        });
    }

    _read(size) {
        const buffer = Buffer.alloc(size);
        fs.read(this.fd, buffer, 0, size, null, (error, bytesRead) => {
            this.push(bytesRead > 0 ? buffer.slice(0, bytesRead) : null);
        });
    }

    _destroy(error, callback) {
        if (this.fd) {
            fs.close(this.fd, (er) => { 
                callback(er || error);
            });
        } else {
            callback(error);
        }
      }
}

module.exports = ReadFromFileStream;