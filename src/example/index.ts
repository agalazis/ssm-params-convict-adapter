import * as logger from 'winston';
import SSMParamsConvictAdapter from '../ssm-params-convict-adapter';
import schema from './schema';

(async () => {
  try {
    const config = await SSMParamsConvictAdapter.convict(schema);
    logger.info(JSON.stringify(config.getProperties()));
  } catch (e) {
    logger.log('error', e);
  }
})();
