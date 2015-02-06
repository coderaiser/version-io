(function() {
    'use strict';
    
    var fs          = require('fs'),
        assert      = require('assert'),
        readjson    = require('readjson'),
        minor       = require('minor');
    
    module.exports  = function(version, options, callback) {
        var dir, name;
        
        if (!callback) {
            callback    = options;
        } else {
            dir         = options.dir;
            name        = options.name;
        }
        
        assert(version, 'version could not be empty!');
        assert(callback, 'callback could not be empty!');
        
        if (!dir)
            dir         = process.cwd();
        
        if (!name)
            name        = 'package';
        
        name            = dir + '/' + name + '.json';
        
        readjson(name, function(error, json) {
            if (error)
                callback(error);
            else if (!version)
                callback(null, 'v' + json.version);
            else
                update(name, version, json, callback);
        });
    };
    
    function update(name, version, info, callback) {
        var json,
            mmpRegExp   = /major|minor|patch/,
            vRegExp     = /^v/;
            
        if (mmpRegExp.test(version))
            version = minor(version, info.version);
        
        else if (vRegExp.test(version))
            version = version.slice(1);
            
        info.version    = version;
        json            = JSON.stringify(info, 0, 2) + '\n';
        
        fs.writeFile(name, json, callback);
    }
    
})();
