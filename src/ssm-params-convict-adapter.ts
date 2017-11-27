import * as awsParamStore from 'aws-param-store';
import * as convict from 'convict';
import { isObject, set } from 'lodash';
import { ISSMParamsAccumulator } from './interfaces';
import { deepReduce } from './util';

export class SSMParamsConvictAdapter {
  private static constructParamsFromConvictSchema(schema: convict.Schema) {
    const {promises, params } = deepReduce(
      schema,
      (
        {promises: ssmPromises, params: ssmParams}: ISSMParamsAccumulator,
        val: any, key: any, obj: any, path: string, root: any,
      ) => {
        if (key === 'ssmPath') {
          promises.push(
            (awsParamStore as any).newQuery(val)
              .execute().then( (value: string) => {
                set(params, path, value);
              }),
          );
        }
      },
      {
        promises: [],
        params: {},
      },
    );
    return Promise.all(promises).then(() => {
      return params;
    });
  }
  // just making the constructor private since
  // this is a static class and will never be intantiated
  private constructor(){

  }
  public static convict(schema: convict.Schema, validate?: boolean): Promise<convict.Config> {
    const config = this.convict(schema);
    return this.loadSSMParams(config, schema, validate);
  }
  private static loadSSMParams(config: convict.Config, schema: convict.Schema, validate = false) {
    return this.constructParamsFromConvictSchema(schema).then((params: any) => {
      config.load(params);
      if (validate) { config.validate(); }
      return config;
    });
  }
}
