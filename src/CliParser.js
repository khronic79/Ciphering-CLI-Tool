const { CliParserError } = require('./errors/errors');

function cliParser() {
    const args = process.argv.slice(2);

    if (args.length === 0) throw new CliParserError('Arguments quantity is null. Please define arguments');

    if (args.length % 2 !== 0) throw new CliParserError('Not all arguments have value. Please define arguments');

    const argsObj = {};
    for (let i = 0; i < args.length; i += 2) {
        argsObj[args[i]] = args[i + 1];
    }
    let config = 0;
    let input = 0;
    let output = 0;
    let argQty = 0;
    Object.keys(argsObj).forEach(key => {
        argQty += 1;

        if (key === '-c' || key === '--config') config += 1;
        if (config > 1) throw new CliParserError('Parametr --config (-c) can not repeat more then one time');

        if (key === '-i' || key === '--input') input += 1;
        if (input > 1) throw new CliParserError('Parametr --input (-i) can not repeat more then one time');

        if (key === '-o' || key === '--output') input += 1;
        if (output > 1) throw new CliParserError('Parametr --output (-o) can not repeat more then one time');
    });

    if (config === 0) throw new CliParserError('Param --config (-c) is required');

    if (argQty > (config + input + output)) throw new CliParserError('You can use only 3 params: \n1) --config(-c);\n2) --input(-i);\n2) --output(-o)');

    const outputArg = {};
    Object.keys(argsObj).forEach(key => {
        if (key === '-c' || key === '--config') outputArg.config = argsObj[key];
        if (key === '-i' || key === '--input') outputArg.input = argsObj[key];
        if (key === '-o' || key === '--output') outputArg.output = argsObj[key];
    });

    return outputArg;
}

module.exports = cliParser;

