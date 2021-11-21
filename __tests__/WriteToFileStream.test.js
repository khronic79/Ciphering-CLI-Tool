jest.mock('fs');

const WriteToFileStream = require('../src/WriteToFileStream');
const ReadFromFileStream = require('../src/ReadFromFileStream');
const ReadbleStream = require('stream').Readable;

describe('Test writable stream (writing to file). Positive scenario', () => {
    const MOCK_FILE_INFO = {
        '/path/to/file1.js': 'check',
        '/path/to/file2.txt': '',
        '/path/to/file3.txt': '___',
        '/path/to/file4.txt': '',
    };
    const getContent = require('fs').__getFileContent;
    beforeEach(() => {
        // Set up some mocked out file info before each test
        require('fs').__createMockFiles(MOCK_FILE_INFO);
    });
    it('Positive scenario / Writing: ', (done) => {
        const writableStream = new WriteToFileStream('/path/to/file2.txt');
        const inputStream = new ReadbleStream();
        writableStream.on('close', () => {
            expect(getContent('/path/to/file2.txt')).toBe('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
            done();
        });
        inputStream.push('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
        inputStream.push(null);
        inputStream.pipe(writableStream);
    });
});

describe('Test writable stream (writing to file). Negative scenarios', () => {
    it('Negativ scenario (custom Error): ', (done) => {
        const writableStream = new WriteToFileStream('/path/to/file.js');
        writableStream.on('error', (err) => {
            expect(err.code).toBe(3333);
            done();
        });
    });
    it('Negative scenario (standart Error): ', (done) => {
        const writableStream = new WriteToFileStream('/path/to/file3.txt');
        writableStream.on('error', (err) => {
            expect(err.code).toBe('any');
            done();
        })
    });
});

describe('Testing both stream (reading from file / writing to file). Positive scenario', () => {
    const getContent = require('fs').__getFileContent;
    it('testing', (done) => {
        const readableStream = new ReadFromFileStream('/path/to/file1.js');
        const writableStream = new WriteToFileStream('/path/to/file4.txt');
        writableStream.on('close', () => {
            expect(getContent('/path/to/file4.txt')).toBe('check');
            done();
        });
        readableStream.pipe(writableStream);
    });
});