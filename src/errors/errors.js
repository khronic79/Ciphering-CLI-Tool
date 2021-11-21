class CliParserError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.name = 'CliParserError';
        this.isCustom = true;
        this.code = 1111;
    }
}

class StreamsConfigError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.name = 'StreamsConfigError';
        this.isCustom = true;
        this.code = 2222;
    }
}

class FilesExistingError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.name = 'FilesExistingError';
        this.isCustom = true;
        this.code = 3333;
    }
}

module.exports = {
    CliParserError,
    StreamsConfigError,
    FilesExistingError
}