// TODO описать README.md
const errorsHandler = require('./src/errors/errorsHandler');
const cliParser = require('./src/CliParser');
const ReadFromFileStream = require('./src/ReadFromFileStream');
const WriteToFileStream = require('./src/WriteToFileStream');
const createStreamArray = require('./src/createStreamArray');
const { pipeline } = require('stream');

let argsObj;
try {
    argsObj = cliParser();
} catch (error) {
    errorsHandler(error);
}

let inputStream;
let outputStream;

if (argsObj.input) {
    try {
        inputStream = new ReadFromFileStream(argsObj.input);
    } catch (error) {
        errorsHandler(error);
    }
} else {
    try {
        inputStream = process.stdin;
    } catch {
        errorsHandler(error);
    }
}

if (argsObj.output) {
    try {
        outputStream = new WriteToFileStream(argsObj.output);
    } catch (error) {
        errorsHandler(error);
    }
} else {
    outputStream = process.stdout;
}

let streams;

try {
    streams = createStreamArray(argsObj.config);
} catch (error) {
    errorsHandler(error);
}

pipeline(
    inputStream,
    ...streams,
    outputStream,
    (err) => {
        if (err) {
          console.error('Pipeline failed.', err);
        } else {
          console.log('Pipeline succeeded.');
        }
    }
);