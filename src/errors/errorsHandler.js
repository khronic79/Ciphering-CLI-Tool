function errorsHandler (error) {
    const { isCustom } = error;

    if (isCustom) {
        process.stderr.write(error.message);
        process.exit(error.code);
    } else {
        throw error;
    }
}

module.exports = errorsHandler;