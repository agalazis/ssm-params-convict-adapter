[![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)
[![Maintainability](https://api.codeclimate.com/v1/badges/05af23a820bd94699757/maintainability)](https://codeclimate.com/github/agalazis/ssm-params-convict-adapter/maintainability)
[![bithound](https://img.shields.io/bithound/code/github/agalazis/ssm-params-convict-adapter.svg)](https://www.bithound.io/github/agalazis/ssm-params-convict-adapter)
[![styled with prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Built with generator-ts-np](https://img.shields.io/badge/scaffolding-ts_np-2699ad.svg)](https://github.com/vajahath/generator-ts-np)

# ssm-params-convict-adapter
Allows loading ssm parameters via convict


[![npm](https://img.shields.io/npm/v/ssm-params-convict-adapter.svg)](https://www.npmjs.com/package/ssm-params-convict-adapter)
[![npm](https://img.shields.io/npm/dt/ssm-params-convict-adapter.svg)]()
[![node version](https://img.shields.io/node/v/ssm-params-convict-adapter/latest.svg)]()
[![Dependency Security Status](https://david-dm.org/agalazis/ssm-params-convict-adapter.svg)](https://david-dm.org/agalazis/ssm-params-convict-adapter)
[![Peer Dependencies Security Status](https://david-dm.org/agalazis/ssm-params-convict-adapter/peer-status.svg)](https://david-dm.org/agalazis/ssm-params-convict-adapter?type=peer)
[![Travis](https://img.shields.io/travis/agalazis/ssm-params-convict-adapter.svg)](https://travis-ci.org/agalazis/ssm-params-convict-adapter)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/agalazis/ssm-params-convict-adapter/blob/master/.github/CONTRIBUTING.md)
[![License](https://img.shields.io/github/license/agalazis/ssm-params-convict-adapter.svg)]()


<!-- [![License](https://img.shields.io/github/license/agalazis/ssm-params-convict-adapter.svg)]
() -->

![](media/cong.jpg)

## Install

```
npm i --save ssm-params-convict-adapter
```

### Peer Dependencies
Before installing this package you need the following peer dependencies installed in your project (If they are not already installed):

```
npm i -D aws-sdk convict
```

## How it works?
The schema is expressed as a conventional convict schema with an extra property `ssmParameter` that eaccepts an object with two values the path and whether it should be strict when requesting the value (error in absence of a value).

Example schema:
```js
const schema = {
  auth: {
    default: true,
    doc: 'Whether authentication is required',
    env: 'TESTDB_AUTH',
    format: Boolean,
  },
  password: {
    default: '',
    doc: 'The example testdb password',
    env: 'TESTDB_PASS',
    format: String,
    ssmParameter: {
      path: '/testdb/db/password',
      strict: false,
    },
  },
  username: {
    default: '',
    doc: 'The example testdb username',
    env: 'TESTDB_USER',
    format: String,
    ssmParameter: {
      path: '/testdb/db/username',
      strict: true,
    },
  },
};
export default schema;
```

## Usage
Example usage:
```js
import * as logger from 'winston';
import SSMParamsConvictAdapter from 'ssm-params-convict-adapter';
import schema from './schema';

(async () => {
  try {
    const config = await SSMParamsConvictAdapter.convict(schema);
    logger.info(JSON.stringify(config.getProperties()));
  } catch (e) {
    logger.log('error', e);
  }
})();
```

## Change log
v0.0.3

[![used version of ts-np generator](https://img.shields.io/badge/ts--np-v1.0.2-a5a5a5.svg?style=flat-square)](https://github.com/vajahath/generator-ts-np)

## Licence
WTFPL &copy; [Andreas Galazis](https://twitter.com/agalazis)
