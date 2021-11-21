const CaesarCipherStream = require('../src/CaesarCipherStream');
const ReadbleStream = require('stream').Readable;
const WritableStream = require('stream').Writable;

describe('Caesar Cipher Transform Stream test', () => {
    it('Streaming process test / C1 (encode)', (done) => {
        let str = '';
        const testetStream = new CaesarCipherStream(1, 'encode');
        const inputStream = new ReadbleStream();
        const writableStream = new WritableStream({
            write(chunk, encoding, callback){
                str += chunk.toString();
                callback();
            }
        });
        writableStream.on('close', () => {
            expect(str).toBe('bcdefghijklmnopqrstuvwxyzaBCDEFGHIJKLMNOPQRSTUVWXYZA');
            done();
        });
        inputStream.push('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
        inputStream.push(null);
        inputStream.pipe(testetStream).pipe(writableStream);
    });
    it('Streaming process test / C0 (decode)', (done) => {
        let str = '';
        const testetStream = new CaesarCipherStream(1, 'decode');
        const inputStream = new ReadbleStream();
        const writableStream = new WritableStream({
            write(chunk, encoding, callback){
                str += chunk.toString();
                callback();
            }
        });
        writableStream.on('close', () => {
            expect(str).toBe('zabcdefghijklmnopqrstuvwxyZABCDEFGHIJKLMNOPQRSTUVWXY');
            done();
        });
        inputStream.push('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
        inputStream.push(null);
        inputStream.pipe(testetStream).pipe(writableStream);
    });
});