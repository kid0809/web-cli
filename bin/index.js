#!/usr/bin/env node

const fs = require('fs');
const program = require('commander')
const inquirer = require('inquirer')
const download = require('download-git-repo');
const ora = require('ora');
const chalk = require('chalk');


program.version('1.0.0')
    .usage('<command> [options]')
    .command('init <app-name>')
    .description('创建新项目')
    .action((name, cmd) => {
        console.log('name', name)
        const options = cleanArgs(cmd)
        console.log('options', options)
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

program.parse(process.argv)

function cleanArgs(cmd) {
    const args = {}
    cmd.options.forEach(o => {
        const key = camelize(o.long.replace(/^--/, ''))
        // if an option is not present and Command has a method with the same name
        // it should not be copied
        if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
            args[key] = cmd[key]
        }
    })
    return args
}