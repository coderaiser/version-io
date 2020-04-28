'use strict';

const assert = require('assert');
const readjson = require('readjson');
const writejson = require('writejson');
const minor = require('minor');
const pkgUp = require('pkg-up');

module.exports = async (version) => {
    assert(version, 'version could not be empty!');
    
    const name = await pkgUp();
    const json = await readjson(name);
    
    if (!version)
        return `v${json.version}`;
            
    await update(name, version, json);
};

async function update(name, version, info) {
    const mmpRegExp = /major|minor|patch/;
    const vRegExp = /^v/;
    
    if (mmpRegExp.test(version))
        version = minor(version, info.version);
    
    else if (vRegExp.test(version))
        version = version.slice(1);
    
    info.version = version;
    
    await writejson(name, info, {
        space: 2,
    });
}

