const fs = require('fs');

function createComponent(name, isFunction) {
    if (!name) {
        return console.log('请输入组件名');
    }
    // 检查文件夹是否存在.
    fs.access(name, fs.constants.F_OK, (err) => {
        if (err) {
            // err为文件不存在
            fs.mkdir(`${name}`, (err) => {
                if (err) throw err;
                const jsTemplate = isFunction ? require('./templates/functionComponent')(name)
                    : require('./templates/classComponent')(name);
                const styleTemplate = require('./templates/styles')(name);
                fs.writeFile(`${name}/index.js`, jsTemplate, (err) => {
                    if (err) throw err;
                    console.log('js组件创建成功');
                });
                fs.writeFile(`${name}/styles.scss`, styleTemplate, (err) => {
                    if (err) throw err;
                    console.log('组件样式创建成功');
                });
            });
        } else {
            console.log(`${name} 文件夹已经存在，请先删除`);
        }
    });
}

module.exports = createComponent;
