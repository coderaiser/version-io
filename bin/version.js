#!/usr/bin/env node

import process from 'node:process';
import {createRequire} from 'node:module';
import readjson from 'readjson';
import tryToCatch from 'try-to-catch';
import {packageUp} from 'package-up';
import version from '../lib/version.js';

const require = createRequire(import.meta.url);
const [arg] = process.argv.slice(2);

main();

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
    
    const name = await packageUp();
    
    if (!name)
        return console.error('package.json: not found');
    
    const [error, info] = await tryToCatch(readjson, name);
    
    if (!error)
        return console.log(info.version || 'no version');
    
    if (error.code === 'ENOENT')
        return console.error('package.json: not found');
    
    return console.error('package.json:', error.message);
}
