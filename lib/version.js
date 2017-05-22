'use strict';

const assert = require('assert');
const readjson = require('readjson');
const writejson = require('writejson');
const minor = require('minor');
const pkgUp = require('pkg-up');
const fullstore = require('fullstore');

module.exports = (version, callback) => {
    assert(version, 'version could not be empty!');
    assert(callback, 'callback could not be empty!');
    
    pkgUp().then((name) => {
        readjson(name, (error, json) => {
            if (error)
                return callback(error);
            
            if (!version)
                return callback(null, 'v' + json.version);
            
            update(name, version, json, callback);
        });
    });
};

function update(name, version, info, callback) {
    const mmpRegExp = /major|minor|patch/;
    const vRegExp = /^v/;
    
    if (mmpRegExp.test(version))
        version = minor(version, info.version);
    
    else if (vRegExp.test(version))
        version = version.slice(1);
        
    info.version = version;
    
    writejson(name, info, {space: 2}, callback);
}

