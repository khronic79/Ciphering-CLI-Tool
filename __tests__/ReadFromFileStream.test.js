jest.mock('fs');

const ReadFromFileStream = require('../src/ReadFromFileStream');

describe('Test reading from file', () => {
    const MOCK_FILE_INFO = {
        '/path/to/file1.js': 'console.log("file1 contents");',
        '/path/to/file2.txt': 'file2 contents',
        '/path/to/file3.txt': '___',
    };
    beforeEach(() => {
        // Set up some mocked out file info before each test
        require('fs').__createMockFiles(MOCK_FILE_INFO);
    });
    it('Positive scenario / Reading by Readble', (done) => {
        let str = '';
        const readableStream = new ReadFromFileStream('/path/to/file1.js');
        readableStream.on('readable', () => {
            let data = readableStream.read();
            if (data) {
                str += data.toString();
            }
        });
        readableStream.on('close', () => {
            expect(str).toBe('console.log("file1 contents");');
            done();
        });        
    });
    it('Negative scenario (custom Error): ', (done) => {
        const readableStream = new ReadFromFileStream('/path/to/file.js');
        readableStream.on('error', (err) => {
            expect(err.code).toBe(3333);
            done();
        })
    });

    it('Negative scenario (standart Error): ', (done) => {
        const readableStream = new ReadFromFileStream('/path/to/file3.txt');
        readableStream.on('error', (err) => {
            expect(err.code).toBe('any');
            done();
        })
    });

});