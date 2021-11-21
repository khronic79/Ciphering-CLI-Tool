const ROT8 = require('../src/ROT8Stream');
const ReadbleStream = require('stream').Readable;
const WritableStream = require('stream').Writable;

describe('Caesar Cipher Transform Stream test', () => {
    it('Streaming process test / R1 (encode)', (done) => {
        let str = '';
        const testetStream = new ROT8(8, 'encode');
        const inputStream = new ReadbleStream();
        const writableStream = new WritableStream({
            write(chunk, encoding, callback){
                str += chunk.toString();
                callback();
            }
        });
        writableStream.on('close', () => {
            expect(str).toBe('ijklmnopqrstuvwxyzabcdefghIJKLMNOPQRSTUVWXYZABCDEFGH');
            done();
        });
        inputStream.push('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
        inputStream.push(null);
        inputStream.pipe(testetStream).pipe(writableStream);
    });
    it('Streaming process test / R0 (decode)', (done) => {
        let str = '';
        const testetStream = new ROT8(8, 'decode');
        const inputStream = new ReadbleStream();
        const writableStream = new WritableStream({
            write(chunk, encoding, callback){
                str += chunk.toString();
                callback();
            }
        });
        writableStream.on('close', () => {
            expect(str).toBe('stuvwxyzabcdefghijklmnopqrSTUVWXYZABCDEFGHIJKLMNOPQR');
            done();
        });
        inputStream.push('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
        inputStream.push(null);
        inputStream.pipe(testetStream).pipe(writableStream);
    });
});