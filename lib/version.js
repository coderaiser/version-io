(function() {
    'use strict';
    
    var fs          = require('fs'),
        readjson    = require('readjson'),
        minor       = require('minor'),
        
        Name        = '/package.json';
    
    module.exports  = function(version, dir, callback) {
        if (!callback) {
            callback    = dir;
            dir         = process.cwd();
        }
        
        readjson(dir + Name, function(error, json) {
            if (error)
                callback(error);
            else if (!version)
                callback(null, 'v' + json.version);
            else
                update(version, json, callback);
        });
    };
    
    function update(version, info, callback) {
        var json,
            mmpRegExp   = /major|minor|patch/,
            vRegExp     = /^v/;
            
        if (mmpRegExp.test(version))
            version = minor(version, info.version);
        
        else if (vRegExp.test(version))
            version = version.slice(1);
            
        info.version    = version;
        json            = JSON.stringify(info, 0, 2) + '\n';
        
        fs.writeFile('package.json', json, callback);
    }
    
})();
