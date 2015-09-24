#!/usr/bin/env node

(function() {
    'use strict';
    
    var version     = require('..'),
        readjson    = require('readjson'),
        tryCatch    = require('try-catch'),
        args        = process.argv.slice(2),
        arg         = args[0],
        name        = process.cwd() + '/package.json',
        
        error,
        info;
    
    if (!arg) {
        error = tryCatch(function() {
            info = readjson.sync(name);
        });
        
        if (error)
            if (error.code === 'ENOENT')
                console.error('package.json: not found');
            else
                console.error('package.json:', error.message);
        else
            console.log(info.version || 'no version');
    } else if (/^(-v|--version)$/.test(arg)) {
        console.log('v' + require('../package').version);
    } else {
        version(arg, function(error, data) {
            if (error)
                console.error(error.message);
            else if (data)
                console.log(data);
        });
    }
})();
