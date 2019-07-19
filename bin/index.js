#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const program = require('commander')
const inquirer = require('inquirer')
const download = require('download-git-repo');
const ora = require('ora');
const chalk = require('chalk');


program.version('1.0.0')
    .usage('<command> [options]')

program
    .command('init')
    .description('初始化新项目')
    .action(() => {
        const name = path.basename(process.cwd());
        inquirer.prompt([{
            type: 'input',
            message: `项目名称(${name})?`,
            prefix: '',
            name: 'name'
        }, {
            type: 'list',
            message: '项目类型?',
            name: 'type',
            prefix: '',
            choices: [
                "react-pc",
                "react-ie8",
                "react-mobile"
            ],
        }]).then(answers => {
            answers.name = answers.name === '' ? name : answers.name
            if (answers.type === 'react-pc') {
                console.log('正在下载模板...');
                const dir = process.cwd();
                const spinner = ora('正在下载项目模板...')
                spinner.start();
                download('kid0809/react-template#pc', dir, (err) => {
                    if (err) {
                        spinner.fail()
                        console.log(chalk.red(`创建失败：${error.message}`))
                    } else {
                        spinner.succeed()

                        fs.readFile('package.json', 'utf8', (err, data) => {
                            if (err) throw err;
                            const pkg = JSON.parse(data);
                            pkg.name = answers.name;
                            fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
                            console.log(chalk.green('项目初始化成功!'));
                            console.log(chalk.cyan('接下来请运行 npm install 和 npm run dev 来启动项目'));
                        })
                    }
                });
            }
            if (answers.type === 'react-ie8') {
                console.log('敬请期待...');
            }

            if (answers.type === 'react-mobile') {
                console.log('敬请期待...');
            }
        });
    })

program
    .command('create <component-name>')
    .description('创建新组件')
    .option('-f, --function', '创建函数组件')
    .action((name, cmd) => {
        const isFunction = cleanArgs(cmd).function ? true : false;
        const create = require('../lib/createComponent');
        create(name, isFunction);
    })

program.parse(process.argv)


function camelize(str) {
    return str.replace(/-(\w)/g, (_, c) => c ? c.toUpperCase() : '')
}

function cleanArgs(cmd) {
    const args = {}
    cmd.options.forEach(o => {
        const key = camelize(o.long.replace(/^--/, ''))
        if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
            args[key] = cmd[key]
        }
    })
    return args
}
