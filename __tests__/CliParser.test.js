describe('CLI Parcer tests: ', () => {
    it('There are all parametrs: ', () => {
        process.argv = ['node', 'index', '-c', 'A-C1-C0', '-i', 'input.txt', '-o', 'output'];
        const outputObj = require('../src/CliParser')();
        expect(outputObj).toHaveProperty('config');
        expect(outputObj).toHaveProperty('input');
        expect(outputObj).toHaveProperty('output');
    });

    it('NULL arguments: ', () => {
        process.argv = ['node', 'index'];
        const cliParcer = require('../src/CliParser');
        expect(cliParcer).toThrow();
    });

    it('Not all arguments have value: ', () => {
        process.argv = ['node', 'index', '-c'];
        const cliParcer = require('../src/CliParser');
        expect(cliParcer).toThrow();
    });

    it('Double --config argument: ', () => {
        process.argv = ['node', 'index', '-c', 'C0', '--config', 'C0'];
        const cliParcer = require('../src/CliParser');
        expect(cliParcer).toThrow();
    });

    it('Double --input argument: ', () => {
        process.argv = ['node', 'index', '-c', 'C0', '-i', 'input.txt', '--input', 'input.txt'];
        const cliParcer = require('../src/CliParser');
        expect(cliParcer).toThrow();
    });

    it('Double --output argument: ', () => {
        process.argv = ['node', 'index', '-c', 'C0', '-o', 'output.txt', '--output', 'output.txt'];
        const cliParcer = require('../src/CliParser');
        expect(cliParcer).toThrow();
    });

    it('There is not config: ', () => {
        process.argv = ['node', 'index', '-i', 'input.txt', '-o', 'output.txt'];
        const cliParcer = require('../src/CliParser');
        expect(cliParcer).toThrow();
    });

    it('More than 3 arguments in CLI: ', () => {
        process.argv = ['node', 'index', '-c', 'C0', '-i', 'input.txt', '-o', 'output.txt', 'smthelse', '123'];
        const cliParcer = require('../src/CliParser');
        expect(cliParcer).toThrow();
    });

});