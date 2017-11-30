//import * as awsParamStore from 'aws-param-store';
import { SSM } from 'aws-sdk';
import { loadSsmParamsIntoConfig } from 'aws-ssm-parameters-injector';
import * as convict from 'convict';
import { isObject, set, get, merge } from 'lodash';
import { ISSMParamsAccumulator } from './interfaces';
import { deepReduce } from './util';

export default class SSMParamsConvictAdapter {
  private static async constructParamsFromConvictSchema(schema: convict.Schema, ssm: SSM) {
    //const {promises, params }
    const { strictConfig, config, paths}= deepReduce(
      schema,
      (
        acc: ISSMParamsAccumulator, val: any, key: any, obj: any, path: string, root: any,
      ) => {
        if (key !== 'ssmPath') {
          return acc;
        }
        const ssmPath =`ssm:${val.path}`
        if (!val.strict){
          set(acc.config, path, ssmPath );
          acc.paths[path] = ssmPath
          return acc;
        }
        set(acc.strictConfig, path, ssmPath );
        return acc;
      },
      {
        paths : {},
        config: {},
        strictConfig: {}
      },
    );
    console.log(config,strictConfig)
    const a = await Promise.all([
      loadSsmParamsIntoConfig(config, {ssm}), 
      loadSsmParamsIntoConfig(strictConfig, {ssm, strict:true}),
    ]);
    console.log(a)
    const [params, strictParams] =a;
    for (let path in paths){
      if (get(params, path) === paths[path]){
        set(params, path, undefined)
      }
    }
    merge( params, strictParams)
    console.log(params);
    return params;
  }
  // just making the constructor private since
  // this is a static class and will never be intantiated
  private constructor(){

  }
  public static convict(schema: convict.Schema, validate?: boolean, ssm?:SSM): Promise<convict.Config> {
    const config = convict(schema);
    return this.loadSSMParams(config, schema, validate, ssm);
  }
  private static async loadSSMParams(config: convict.Config, schema: convict.Schema, validate = false, ssm = new SSM()) {
    const params= await this.constructParamsFromConvictSchema(schema, ssm);
    config.load(params);
    if (validate) { config.validate(); }
    return config;
  }
}
