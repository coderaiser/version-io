(function() {
    'use strict';
    
    var fs      = require('fs'),
        minor   = require('minor'),
        exec    = require('execon');
    
    module.exports  = function(version, dir, callback) {
        var json,
            mmpRegExp   = /major|minor|patch/,
            vRegExp     = /^v/,
            info,
            
            error       = exec.try(function() {
                info    = require(process.cwd() + '/package');
            });
        
        if (!callback) {
            callback    = dir;
            dir         = process.cwd();
        }
        
        if (error) {
            callback(error);
        } else if (!version) {
            callback(null, 'v' + info.version);
        } else {
            if (mmpRegExp.test(version))
                version = minor(version, info.version);
            
            else if (vRegExp.test(version))
                version = version.slice(1);
                
            info.version    = version;
            json            = JSON.stringify(info, 0, 2) + '\n';
            
            fs.writeFile('package.json', json, callback);
        }
    };
    
})();
