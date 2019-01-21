#!/usr/bin/env node

var validator = require("email-validator");
var axios = require('axios');
var figlet = require('figlet');//ASCII
var chalk = require('chalk');//COLORS
const ora = require('ora');//SPINNER


chalk.green(figlet('BECODE', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
}))


const [,, ...args] = process.argv;

if (validator.validate(`${args}`) == true){
    console.log(`L'adresse ${args} est valide`);

}else{
    console.log(`[!!!] L'adresse ${args} est invalide`)
}

axios({
    method: 'get',
    url: `https://haveibeenpwned.com/api/v2/breachedaccount/${args}`,
    headers: {
       'User-Agent': 'pwndmail'
    },
 }).then(res => {
    console.log(chalk.bgRed("You've been powned by"))

     res.data.forEach(function (breach){
        console.log(breach.Domain)
     })
    
 }).catch(err => {
    const log = chalk.yellow(err)
 });
