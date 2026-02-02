#!/usr/bin/env node

import process from 'node:process';
import readjson from 'readjson';
import {tryToCatch} from 'try-to-catch';
import {packageUp} from 'package-up';
import {updateVersion} from '../lib/version.js';

const {stringify} = JSON;

const [arg] = process.argv.slice(2);

const isExtended = arg && arg === '-e';

if (/^(-v|--version)$/.test(arg))
    process.exit();

if (arg && !isExtended) {
    const [e, data] = await tryToCatch(updateVersion, arg);
    
    if (e)
        process.exit();
    
    if (data)
        console.log(data);
    
    process.exit();
}

const name = await packageUp();

if (!name)
    process.exit();

const [error, info] = await tryToCatch(readjson, name);

if (!error) {
    if (!isExtended) {
        console.log(info.version || '<no version>');
        process.exit();
    }
    
    const {codeFrameColumns} = await import('@putout/babel');
    const result = stringify({
        version: info.version,
        engines: info.engines,
        peerDependencies: info.peerDependencies,
    }, null, 4);
    
    console.log(codeFrameColumns(result, {}, {
        highlightCode: true,
    }));
    
    process.exit();
}

if (error.code === 'ENOENT')
    process.exit(1);

console.error('package.json:', error.message);
