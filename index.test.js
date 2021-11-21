const { exec } = require('child_process');
const stream   = require('stream');

describe('Error scenarios', () => {
    it('Input: User passes the same cli argument twice (node index -c C1-C1-A-R0 -c C0)', (done) => {
        exec('node index -c C1-C1-A-R0 -c C0', (err, stdout, stderr) => {
            expect(stderr).toBe('Error: You provided -c argument more than once');
            done();
        });
    });
    it('Input: User doesn t pass -c or --config argument (node index -i input.txt)', (done) => {
        exec('node index -i input.txt', (err, stdout, stderr) => {
            expect(stderr).toBe('Param --config (-c) is required');
            done();
        });
    });
    it('Input: User passes -i argument with path that doesn t exist or with no read access (node index -c C1-C1-A-R0 -i inpt.txt)', (done) => {
        exec('node index -c C1-C1-A-R0 -i inpt.txt', (err, stdout, stderr) => {
            expect(stderr).toBe('File or path does not exit');
            done();
        });
    });
    it('Input: User passes -o argument with path to directory that doesn t exist or with no read access ( -o outre.txt)', (done) => {
        exec('node index -c C1-C1-A-R0 -i "./__tests__/test-data/input.txt" -o outre.txt', (err, stdout, stderr) => {
            expect(stderr).toBe('File or path does not exit');
            done();
        });
    });
    it('Input: User passes incorrent symbols in argument for --config (node index -c K1-M1-A-R0)', (done) => {
        exec('node index -c K1-M1-A-R0', (err, stdout, stderr) => {
            expect(stderr).toBe('Config is not valid');
            done();
        });
    });
});

describe('Success scenarios', () => {
    it('Input: User passes correct sequence of symbols as argument for --config', (done) => {
        exec('node index -c "C1-C1-R0-A" -i "./__tests__/test-data/input.txt"', (err, stdout) => {
            expect(stdout).toBe('Myxn xn nbdobm. Tbnnfzb ferlm "_" nhteru!');
            done();
        });
    });
    it('Stream data from stdin to stdout', (done) => {
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