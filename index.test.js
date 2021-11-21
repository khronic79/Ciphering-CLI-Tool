const { exec } = require('child_process');
const stream   = require('stream');

describe('END-2-END test. Positive scenarios', () => {
    it('file to stdout', (done) => {
        exec('node index -c "C1-C1-R0-A" -i "./__tests__/test-data/input.txt"', (err, stdout) => {
            expect(stdout).toBe('Myxn xn nbdobm. Tbnnfzb ferlm "_" nhteru!');
            done();
        });
    });
    it('stdin to stdout', (done) => {
        const subprocess = exec('node index -c "C1-C1-R0-A"', (err, stdout) => {
            expect(stdout).toBe('Myxn xn nbdobm. Tbnnfzb ferlm "_" nhteru!');
            done();
        });
        const input = 'This is secret. Message about "_" symbol!';
        const stdinStream = new stream.Readable();
        stdinStream.push(input);
        stdinStream.push(null);
        stdinStream.pipe(subprocess.stdin).pipe(subprocess.stdout);
    });
});

describe('END-2-END test. Negative scenarios', () => {
    it('file does not found', (done) => {
        exec('node index -c "C1-C1-R0-A" -i "./__tests__/test-data/iput.txt"', (err, stdout, stderr) => {
            expect(err.code).toBe(3333);
            done();
        });
    });
});