var fs = require('fs');
var path = require('path');
var ppcompress = require('./ppcompress');

function callCompress(_filePath) {

    try {
        var config = JSON.parse(fs.readFileSync(_filePath));
        ppcompress(config.input, config.outport);
    } catch (e) {
        console.log('ppcompress:need a ppcompress.json!');
    }
}

exports.run = function (args) {

    var argN = args.length;

    switch (argN) {
        case 0:
            callCompress('./ppcompress.json');
            break;
        case 1:
            var param = args[0];
            var stat = fs.lstatSync(param);

            if (stat.isDirectory()) {

                callCompress(path.join(param, '/ppcompress.json'));
            } else if (stat.isFile() && path.basename(param, '.json') == 'ppcompress') {

                callCompress(param);
            } else {

                console.log('ppcompress:param error!');
            }
            break;
        case 2:
            try {
                ppcompress(args[0], args[1]);
            } catch (e) {
                console.log('ppcompress:param error!');
            }
            break;
        default :
            console.log('ppcompress:param error!');

    }

}

