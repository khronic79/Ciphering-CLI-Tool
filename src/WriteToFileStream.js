const { FilesExistingError } = require('./errors/errors');
const fs = require('fs');
const Writable = require('stream').Writable;

class WriteToFileStream extends Writable {
    
    constructor(filePath, options) {
        super(options);
        this.filePath = filePath;
        this.stats = {};
        this.nextStartPoint = 0;
    }

    _construct(callback) {
        fs.open(this.filePath, 'r+',(error, fd) => {
            if (error) {
                if (error.code === 'ENOENT') {
                    const customError = new FilesExistingError('File or path does not exit');
                    callback(customError);
                    // throw customError;
                } else {
                    callback(error);
                    // throw error;
                }
            }
            else {
                this.fd = fd;
                fs.fstat(this.fd, (error, stats ) => {
                    this.stats = stats;
                    this.nextStartPoint = this.stats.size;
                    callback();
                });
            }
        });
    }

    _write(chunk, encoding, callback) {
        const type = Buffer.isBuffer(chunk);
        const buffer = type? chunk: Buffer.from(chunk, encoding);
        const length = buffer.length;
        fs.write(this.fd, buffer, 0, length, this.nextStartPoint, (error, bytesWritten) => {
            this.nextStartPoint += bytesWritten;
            callback();
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

module.exports = WriteToFileStream;