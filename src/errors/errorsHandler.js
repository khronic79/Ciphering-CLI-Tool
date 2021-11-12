const { DefaultAppError } = require('./errors');

function errorsHandler (error = new DefaultAppError()) {
    const { isCustom } = error;

    if (isCustom) {
        process.stderr.write(error.message);
        process.exit(error.errorCode);
    } else {
        throw error;
    }
}

module.exports = errorsHandler;