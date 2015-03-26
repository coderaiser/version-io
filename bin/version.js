#!/usr/bin/env node

(function() {
    'use strict';
    
    var version     = require('..'),
        args        = process.argv.slice(2),
        arg         = args[0];
        
    if (arg === '-v' || arg === '--version')
        console.log('v' + require('../package').version);
    else
        version(arg, function(error, data) {
            if (error)
                console.error(error.message);
            else if (data)
                console.log(data);
        });
})();
