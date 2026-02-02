# Version-io

Semantic versioning tool. Apply `major`, `minor`, `patch` and version to `package.json`.

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

Extended view:

```
# version -e

  1 | {
  2 |     "version": "5.0.0",
  3 |     "engines": {
  4 |         "node": ">=22"
  5 |     }
  6 | }
```

## Use as module

Install `version-io` with:

```
npm i version-io -g
```

## API

### `updateVersion(number: VersionNumber)`

- `VersionNumber` could be new version number or `minor|major|patch`

```js
import {updateVersion} from 'version-io';

await updateVersion('patch');
```

## License

MIT
