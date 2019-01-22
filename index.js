#!/usr/bin/env node

var validator = require("email-validator");
var axios = require('axios');
var figlet = require('figlet');//ASCII
var chalk = require('chalk');//COLORS
const ora = require('ora');//SPINNER


console.log(chalk.yellow(figlet.textSync('Mail-checker @ BECODE \n', {
    horizontalLayout: 'default',
    verticalLayout: 'default'
})));

const [,, ...args] = process.argv;

if (validator.validate(`${args}`) == true){
    console.log(chalk.bold(`${args} is valid.\n\n`));

    let spinner = ora(`Looking for breaches from ${args} \n`)

    spinner.start()

    setTimeout(() => {
        spinner.text = `Looking for breaches from ${args} \n`
    })



    axios({
        method: 'get',
        url: `https://haveibeenpwned.com/api/v2/breachedaccount/${args}`,
        headers: {
        'User-Agent': 'pwndmail'
        },
    }).then(res => { 
        spinner.stop()
        spinner.clear()
        console.log(chalk.bold.underline.bgRed("You've been powned by:\n"))



        res.data.forEach(function (breach){
            console.log(chalk.bold(`- ${breach.Name}`))
            console.log(`  ${breach.Domain}`)
        })

        
        
    }).catch(err => {
        const log = chalk.yellow(err)
        spinner.stop()
        spinner.clear()
 });

}else{
    console.log(`!!! ${args} is invalid.`)
}
