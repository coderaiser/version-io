# Version-io

Semantic versioning tool. Apply major, minor, patch and version to `package.json`.

## Install

`npm i version-io -g`


## How to use?

Show current version:

```
version
# v1.0.0
```
Set new version:

```
version v1.0.1
version
# v1.0.1
```

Apply minor, major or patch:

```
version minor
#v1.1.0
```

## Use as module

Install `version-io` with:

```
npm i version-io --save
```

You could update version in `package.json` with:
```js
var version = require('minor');

version('1.1.1' [,dir], function(error) {
    if (error)
        console.error(error.message);
});
```

`dir` is optional parameter, it is `process.cwd()` by default.

## License

MIT
