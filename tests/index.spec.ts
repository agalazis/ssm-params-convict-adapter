import * as chai from 'chai';
import * as path from 'path';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import SSMParamsConvictAdapter from '../src';
import schema from './convict-schema';
import ssmMockInstance from './ssm-mock';
import * as ssmValues from './ssm-param-values';

/* tslint:disable: no-unused-expression arrow-parens */

// import chai from 'chai';
// import * as proxyquire from 'proxyquire';

chai.use(sinonChai);
const { expect } = chai;

function testConfig(c: any) {
    expect(c).to.be.an('object');
    // @todo add more tests
    expect(c).to.have.property('b', '{bv');
}
describe('constructParamsFromConvictSchema', () => {

  context('When reparameters are provided', () => {
    it('should return the right values', async () => {
      const c = await SSMParamsConvictAdapter.convict(schema, false, ssmMockInstance as any);
      testConfig(c.getProperties());
    });
  });
});
