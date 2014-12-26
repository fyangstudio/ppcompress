var fs = require('fs');
var path = require('path');

// 遍历文件夹
function travel(_dir, _callback) {

    fs.readdirSync(_dir).forEach(function (_file) {

        var __pathname = path.join(_dir, _file);

        if (fs.statSync(__pathname).isDirectory()) {

            travel(__pathname, _callback);

        } else {

            _callback(__pathname);
        }
    });
}

// 压缩 css
function compressCss(_path, _newdir) {

    var rs = fs.createReadStream(_path);
    var tip = new Date().valueOf();
    var newName = _newdir + path.basename(_path, '.css') + tip + '.css';
    var ws = fs.createWriteStream(newName);

    rs.on('data', function (_chunk) {

        var __chunk;

        __chunk = _chunk.toString('utf-8');

        __chunk = __chunk.replace(/[\t\r\n\f]/g, "")
            .replace(/\s*{\s*/g, "{")
            .replace(/\s*}\s*/g, "}")
            .replace(/\s*:\s*/g, ":")
            .replace(/\s*,\s*/g, ",")
            .replace(/\s*-\s*/g, "-")
            .replace(/\s*=\s*/g, "=")
            .replace(/\s*;\s*/g, ";");


        if (ws.write(__chunk) === false) {
            rs.pause();
        }

    });

    rs.on('end', function () {
        ws.end();
        console.log('ppcompress:success!');
    });

    ws.on('drain', function () {
        rs.resume();
    });
}

// 调用打包css
function compressCssStart(_path, _target) {

    var __p = [];

    if (!fs.existsSync(_target)) {

        fs.mkdirSync(_target);
    }

    travel(_path, function (_pathname) {


        if (path.extname(_pathname) == '.css') {
            __p.push(_pathname);
        }

    });

    __p.forEach(function (_pathname) {
        compressCss(_pathname, _target);
    })
}

module.exports = compressCssStart;

