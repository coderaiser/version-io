# Version-io

Semantic versioning tool. Apply major, minor, patch and version to `package.json`.

## Install

`npm i version-io -g`


## How to use?

Show current version:

```
# version
v1.0.0
```
Set new version:

```
# version v1.0.1
# version
v1.0.1
```

Apply minor, major or patch:

```
# version minor
v1.1.0
```

## Use as module

Install `version-io` with:

```
npm i version-io --save
```

Format: `version(number [,dir], callback);`

- `number` could be new version number or `minor|major|patch`
- `dir` is optional parameter, it is `process.cwd()` by default

You could update version in `package.json` with:
```js
var version = require('version-io');

version('1.1.1', function(error) {
    if (error)
        console.error(error.message);
});
```

## License

MIT
