const AdbashStream = require('../src/AdbashStream');
const ReadbleStream = require('stream').Readable;
const WritableStream = require('stream').Writable;

describe('Adbash Transform Stream test', () => {
    it('Streaming process test', (done) => {
        let str = '';
        const testetStream = new AdbashStream();
        const inputStream = new ReadbleStream();
        const writableStream = new WritableStream({
            write(chunk, encoding, callback){
                str += chunk.toString();
                callback();
            }
        });
        writableStream.on('close', () => {
            expect(str).toBe('zyxwvutsrqponmlkjihgfedcbaZYXWVUTSRQPONMLKJIHGFEDCBA');
            done();
        });
        inputStream.push('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
        inputStream.push(null);
        inputStream.pipe(testetStream).pipe(writableStream);
    });
});