# ssm-params-convict-adapter
Allows loading ssm parameters via convict

[![npm](https://img.shields.io/npm/v/ssm-params-convict-adapter.svg)](https://www.npmjs.com/package/ssm-params-convict-adapter)
[![Travis](https://img.shields.io/travis/agalazis/ssm-params-convict-adapter.svg)](https://travis-ci.org/agalazis/ssm-params-convict-adapter)
[![styled with prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![npm](https://img.shields.io/npm/dt/ssm-params-convict-adapter.svg)]()
[![Built with generator-ts-np](https://img.shields.io/badge/scaffolding-ts_np-2699ad.svg)](https://github.com/vajahath/generator-ts-np)

![](media/cong.jpg)

## Install
```
npm i --save ssm-params-convict-adapter
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
MIT &copy; [Andreas Galazis](https://twitter.com/agalazis)
