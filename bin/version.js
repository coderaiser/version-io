#!/usr/bin/env node

'use strict';

const readjson = require('readjson');
const tryToCatch = require('try-to-catch');

const version = require('..');
const args = process.argv.slice(2);
const arg = args[0];
const pkgUp = require('pkg-up');

main()

async function main() {
    if (/^(-v|--version)$/.test(arg))
        return console.log('v' + require('../package').version);
     
    if (arg) {
        const [e, data] = await tryToCatch(version, arg);
        
        if (e)
            return console.error(e.message);
        
        if (data)
            console.log(data);
        
        return;
    }
    
    const name = await pkgUp();
    
    if (!name)
        return console.error('package.json: not found');
    
    const [error, info] = await tryToCatch(readjson, name);
    
    if (!error)
        return console.log(info.version || 'no version');
    
    if (error.code === 'ENOENT')
        return console.error('package.json: not found');
    
    return console.error('package.json:', error.message);
}

