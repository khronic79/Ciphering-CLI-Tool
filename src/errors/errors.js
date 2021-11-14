class DefaultAppError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.name = 'DefaultAppError';
        this.isCustom = true;
        this.errorCode = 1111;
    }
}

class CliParserError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.name = 'CliParserError';
        this.isCustom = true;
        this.errorCode = 1111;
    }
}

class StreamsConfigError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.name = 'StreamsConfigError';
        this.isCustom = true;
        this.errorCode = 2222;
    }
}

class FilesExistingError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.name = 'FilesExistingError';
        this.isCustom = true;
        this.errorCode = 3333;
    }
}

module.exports = {
    DefaultAppError,
    CliParserError,
    StreamsConfigError,
    FilesExistingError
}