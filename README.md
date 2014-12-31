ppcompress-css 是一款压缩css的压缩工具

安装：
```
$npm pack ppcompress
$npm install -g ppcompress
```
使用：

未全局安装下：

```node.js
var compress = require('ppcompress');
compress('../css','../css_min/');
```

全局安装下:

建议配置 ppcompress.json
{
  'input': './',
  'outport': '../test/'
}

使用1：
ppcompress.json 目录下 $ppcompress 

使用2:
$ppcompress ../css

使用3:
$ppcompress ../css/ppcompress.json

使用4:
$ppcompress ../css ../css_min

