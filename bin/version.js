#!/usr/bin/env node

'use strict';

const version = require('..');
const readjson = require('readjson');
const tryCatch = require('try-catch');
const args = process.argv.slice(2);
const arg = args[0];
const pkgUp = require('pkg-up');

main();

function main() {
    if (!arg) {
        const name = pkgUp.sync();
        
        if (!name)
            return console.error('package.json: not found');
        
        const result = tryCatch(readjson.sync, name);
        
        const error = result[0];
        const info = result[1];
        
        if (!error)
            return console.log(info.version || 'no version');
        
        if (error.code === 'ENOENT')
            return console.error('package.json: not found');
        
        return console.error('package.json:', error.message);
    }
    
    if (/^(-v|--version)$/.test(arg))
        return console.log('v' + require('../package').version);
    
    version(arg, (error, data) => {
        if (error)
            return console.error(error.message);
        
        if (data)
            console.log(data);
    });
}

