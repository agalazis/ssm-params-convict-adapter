/**
 * For including *.json file as
 * `import * as <stuff> from './stuffs.json';`
 */

declare module '*.json' {
	const value: any;
	export = value;
}
declare module 'aws-param-store' {
	import { AWSError, SSM, Request } from 'aws-sdk';
	interface ParameterQuery {
		path: (p: string) => ParameterQuery;
		recursive: (enabled?: boolean) => ParameterQuery;
		decryption: (enabled?: boolean) => ParameterQuery;
		execute: () => Promise<SSM.ParameterList>;
		executeSync: () => any;
	}
	interface AWSParamStore {
		newQuery: () => ParameterQuery;
	}

	const value: AWSParamStore;
	export = value;
	// export=paramstore;
}
