import assert from 'node:assert';
import _readjson from 'readjson';
import _writejson from 'writejson';
import minor from 'minor';
import {packageUp as _packageUp} from 'package-up';

export const updateVersion = async (version, overrides = {}) => {
    const {
        packageUp = _packageUp,
        readjson = _readjson,
        writejson = _writejson,
    } = overrides;
    
    assert(version, 'version could not be empty!');
    
    const name = await packageUp();
    const json = await readjson(name);
    
    await update(name, version, json, {
        writejson,
    });
};

async function update(name, version, info, {writejson}) {
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
