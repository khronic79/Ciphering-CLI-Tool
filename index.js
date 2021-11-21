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

if (argsObj.input) inputStream = new ReadFromFileStream(argsObj.input) 
else inputStream = process.stdin;

if (argsObj.output) outputStream = new WriteToFileStream(argsObj.output)
else  outputStream = process.stdout;

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
            errorsHandler(err);
        } else {
          console.log('Pipeline succeeded.');
        }
    }
);