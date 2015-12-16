(function() {
    'use strict';
    
    var assert      = require('assert'),
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
            
        info.version = version;
        
        writejson(name, info, {space: 2}, callback);
    }
    
})();
