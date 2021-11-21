const path = require('path');

const fs = jest.createMockFromModule('fs');

let mockFiles = Object.create(null);
let fds = [];
let fileAndFs = new Map();

function __createMockFiles(newMockFiles) {
    mockFiles = Object.create(null);
    for (const file in newMockFiles) {
        const dir = path.dirname(file);
        if (!mockFiles[dir]) {
            mockFiles[dir] = [];
        }
         if (fds.length === 0) {
            fds[0] = 1;
        } else {
            const last = Math.max(...fds);
            fds[fds.length] = last + 1;
        }
        mockFiles[dir].push(path.basename(file));
        mockFiles[dir][path.basename(file)] = [];
        mockFiles[dir][path.basename(file)][0] = newMockFiles[file];
        mockFiles[dir][path.basename(file)][1] = fds[fds.length-1];
        mockFiles[dir][path.basename(file)][2] = 0;
        fileAndFs[fds[fds.length-1]] = file;
    }
}

function __getFileContent(file) {
    const dir = path.dirname(file);
    const name = path.basename(file);
    return mockFiles[dir][name][0];
}

function __getFileDescriptor(file) {
    const dir = path.dirname(file);
    const name = path.basename(file);
    let fd;
    if (mockFiles[dir] && mockFiles[dir][name]) {
        fd = mockFiles[dir][name][1];
    }
    return fd;
}

function __readFileContent(file, length, position) {
    const dir = path.dirname(file);
    const name = path.basename(file);
    let data = '';
    const fileContent = mockFiles[dir][name][0];
    if (position === null) {
        const filePosition = mockFiles[dir][name][2];
        data = fileContent.slice(filePosition, filePosition + length);
        if (filePosition + length >= fileContent.length) {
            mockFiles[dir][name][2] = fileContent.length;
        } else {
            mockFiles[dir][name][2] = filePosition + length;
        }
    } else {
        data = fileContent.slice(position, position + length);
        if (position + length >= fileContent.length) {
            mockFiles[dir][name][2] = fileContent.length;
        } else {
            mockFiles[dir][name][2] = position + length;
        }
    }
    return data;
}

function __writeFileContent(file, data) {
    const dir = path.dirname(file);
    const name = path.basename(file);
    mockFiles[dir][name][0] += data;
}

function open(file, mode ,cb) {
    const last = arguments.length - 1;
    const callback = arguments[last];
    Promise.resolve(callback).then((callback) => {
        let error;
        const fd = __getFileDescriptor(file);
        if (!fd) {
            error = new Error;
            error.code = 'ENOENT';
        } else {
            const content = __getFileContent(file);
            if (content === '___') {
                error = new Error;
                error.code = 'any';
            }
        }
        callback(error, fd);
    });
}

function read(fd, buffer, offset, length, position, callback) {
    Promise.resolve(callback).then((callback) => {
        const data = __readFileContent(fileAndFs[fd], length, position);
        const error = null;
        buffer.write(data, offset);
        callback(error, data.length);
    });
}

function write(fd, buffer, offSet, length, position, callback) {
    Promise.resolve()
    .then(() => {
        const data = buffer.toString()
        __writeFileContent(fileAndFs[fd], data);
        const error = null;
        const bytesWritten = data.length;
        callback(error, bytesWritten);
    });
}

function fstat(fd, callback) {
    Promise.resolve(callback)
    .then((callback) => {
        const file = fileAndFs[fd];
        const dir = path.dirname(file);
        const name = path.basename(file);
        const string = mockFiles[dir][name][0];
        const error = null;
        callback(error, {
            size: string.length
        });
    });
}

function close(fd, cb) {
    Promise.resolve(cb)
    .then((cb) => {
        const descr = fd;
        cb(null);
    });
}

fs.__createMockFiles = __createMockFiles;

fs.__getFileContent = __getFileContent;

fs.open = open;

fs.read = read;

fs.write = write;

fs.fstat = fstat;

fs.close = close;

module.exports = fs;