/* tslint:disable: no-unused-expression arrow-parens */

// import chai from 'chai';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
// import * as proxyquire from 'proxyquire';
import ssmMockInstance from './ssm-mock';
import * as model from '../src';
import * as chai from 'chai';
import * as path from 'path';
const ssmValues = require('./ssm-param-values.json');
import SSMParamsConvictAdapter from '../src';
chai.use(sinonChai);
const { expect } = chai;

function testEnvSetting(expected, ...envSettings) {
	if (expected.APPDATA === 2) {
		// kill the APPDATA to test both is undefined
		delete process.env.APPDATA;
		delete expected.APPDATA;
	} else if (!process.env.APPDATA && expected.APPDATA === '0') {
		// set APPDATA and test it
		process.env.APPDATA = '0';
	}
	const ret = crossEnv([...envSettings, 'echo', 'hello world']);
	const env = {};
	if (process.env.APPDATA) {
		env.APPDATA = process.env.APPDATA;
	}
	Object.assign(env, expected);
	expect(ret, 'returns what spawn returns').to.equal(spawned);
	expect().to.have.been.calledOnce;
	expect(proxied['cross-spawn'].spawn).to.have.been.calledWith(
		'echo',
		['hello world'],
		{
			stdio: 'inherit',
			env: Object.assign({}, process.env, env)
		}
	);

	expect(spawned.on).to.have.been.calledOnce;
	expect(spawned.on).to.have.been.calledWith('exit');
}

import SSMParamsConvictAdapter from '../src/';

describe('constructParamsFromConvictSchema', () => {
	beforeEach(function() {
		this.ssm = sinon.mock(ssmMockInstance);
	});
	context('When reparameters are provided', () => {
		it('returns 11 for 3,8', done => {
			SSMParamsConvictAdapter.convict();
		});
	});
});
//public static convict(schema: convict.Schema, validate?: boolean, ssm?:SSM)
//loadSSMParams(config: convict.Config, schema: convict.Schema, validate = false, ssm = new SSM())
