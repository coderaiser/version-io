import assert from 'node:assert';
import readjson from 'readjson';
import writejson from 'writejson';
import minor from 'minor';
import {packageUp} from 'package-up';

export default async (version) => {
    assert(version, 'version could not be empty!');
    
    const name = await packageUp();
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
