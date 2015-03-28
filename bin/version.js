#!/usr/bin/env node

(function() {
    'use strict';
    
    var version     = require('..'),
        tryRequire  = require('try-require'),
        args        = process.argv.slice(2),
        arg         = args[0],
        name        = process.cwd() + '/package.json',
        info;
    
    if (!arg) {
        info = tryRequire(name) || {};
        
        if (!info)
            console.error('package.json not found');
        else
            console.log(info.version || 'no version');
    } else if (arg === '-v' || arg === '--version') {
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
