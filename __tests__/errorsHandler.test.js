const errorsHandler = require('../src/errors/errorsHandler');
const { CliParserError } = require('../src/errors/errors');

describe('Handler test', () => {
    const error = new Error('Error');
    const customError = new CliParserError('Custom Error');
    const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});
    it('Custom error', () => {
        errorsHandler(customError);
        expect(mockExit).toHaveBeenCalledWith(1111);
    });
    it('Error', () => {
        expect(()=>{
            errorsHandler(error);
        }).toThrow();
    })
});