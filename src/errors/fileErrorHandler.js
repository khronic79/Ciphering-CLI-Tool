const { FilesExistingError } = require('./errors');

function fileErrorsHandler (error, callback) {
    if (error.code = 'ENOENT') {
        const customError = new FilesExistingError('File or path does not exit');
        callback(customError);
        throw customError;
    } else if (error.code = 'EACCES') {
        const customError = new FilesExistingError('You can not have access to this file');
        callback(customError);
        throw customError;
    } else {
        callback(error);
    }
}

module.exports = fileErrorsHandler;