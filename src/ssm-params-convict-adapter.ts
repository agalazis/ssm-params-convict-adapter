//import * as awsParamStore from 'aws-param-store';
import { SSM } from 'aws-sdk';
import { loadSsmParamsIntoConfig } from 'aws-ssm-parameters-injector';
import * as convict from 'convict';
import { get, isObject, merge, set } from 'lodash';
import { ISSMParamsAccumulator } from './interfaces';
import { deepReduce } from './util';

export default class SSMParamsConvictAdapter {
  public static convict(schema: convict.Schema, validate?: boolean, ssm?: SSM): Promise<convict.Config> {
    const config = convict(schema);
    return this.loadSSMParams(config, schema, validate, ssm);
  }
  private static async loadSSMParams(
    config: convict.Config,
    schema: convict.Schema,
    validate = false, ssm = new SSM(),
  ) {
    const params = await this.constructParamsFromConvictSchema(schema, ssm);
    config.load(params);
    if (validate) { config.validate(); }
    return config;
  }
  private static async constructParamsFromConvictSchema(schema: convict.Schema, ssm: SSM) {
    const { strictConfig, config, paths} = deepReduce(
      schema,
      (
        acc: ISSMParamsAccumulator, val: any, key: any, obj: any, path: string, root: any,
      ) => {
        if (key !== 'ssmParameter') {
          return acc;
        }
        const ssmParameter = `ssm:${val.path}`;
        if (!val.strict) {
          set(acc.config, path, ssmParameter );
          acc.paths[path] = ssmParameter;
          return acc;
        }
        set(acc.strictConfig, path, ssmParameter );
        return acc;
      },
      {
        config: {},
        paths : {},
        strictConfig: {}
      },
    );
    const a = await Promise.all([
      loadSsmParamsIntoConfig(config, {ssm}),
      loadSsmParamsIntoConfig(strictConfig, {ssm, strict: true}),
    ]);
    const [params, strictParams] = a;
    for (const path in paths) {
      if (get(params, path) === paths[path]) {
        set(params, path, undefined);
      }
    }
    merge( params, strictParams);
    return params;
  }

  // just making the constructor private since
  // this is a static class and will never be intantiated
  private constructor() {
  }
}
