import {test, stub} from 'supertape';
import {tryToCatch} from 'try-to-catch';
import {updateVersion} from './version.js';

test('version: readjson', async (t) => {
    const packageUp = stub().resolves('hello');
    const readjson = stub().resolves({
        version: '1.0.0',
    });
    
    const writejson = stub().resolves({
        version: 1,
    });
    
    await updateVersion('minor', {
        packageUp,
        readjson,
        writejson,
    });
    
    t.calledWith(readjson, ['hello']);
    t.end();
});

test('version: writejson', async (t) => {
    const packageUp = stub().resolves('hello');
    const readjson = stub().resolves({
        version: '1.0.0',
    });
    
    const writejson = stub().resolves({
        version: 1,
    });
    
    await updateVersion('minor', {
        packageUp,
        readjson,
        writejson,
    });
    
    const info = {
        version: '1.1.0',
    };
    
    const format = {
        space: 2,
    };
    
    t.calledWith(writejson, ['hello', info, format]);
    t.end();
});

test('version: no arg', async (t) => {
    const packageUp = stub().resolves('hello');
    const readjson = stub().resolves({
        version: '1.0.0',
    });
    
    const writejson = stub().resolves({
        version: 1,
    });
    
    const [error] = await tryToCatch(updateVersion, '', {
        packageUp,
        readjson,
        writejson,
    });
    
    t.equal(error.message, 'version could not be empty!');
    t.end();
});

test('version: set version', async (t) => {
    const packageUp = stub().resolves('hello');
    const readjson = stub().resolves({
        version: '1.0.0',
    });
    
    const writejson = stub().resolves({
        version: 1,
    });
    
    await updateVersion('1.1.1', {
        packageUp,
        readjson,
        writejson,
    });
    
    const info = {
        version: '1.1.1',
    };
    
    const format = {
        space: 2,
    };
    
    t.calledWith(writejson, ['hello', info, format]);
    t.end();
});

test('version: set version: v', async (t) => {
    const packageUp = stub().resolves('hello');
    const readjson = stub().resolves({
        version: '1.0.0',
    });
    
    const writejson = stub().resolves({
        version: 1,
    });
    
    await updateVersion('v1.1.1', {
        packageUp,
        readjson,
        writejson,
    });
    
    const info = {
        version: '1.1.1',
    };
    
    const format = {
        space: 2,
    };
    
    t.calledWith(writejson, ['hello', info, format]);
    t.end();
});
