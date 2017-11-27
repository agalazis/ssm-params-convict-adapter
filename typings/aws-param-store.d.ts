import { AWSError, SSM, Request } from 'aws-sdk';
interface ParameterQuery{
    path: (p:string)=>ParameterQuery;
    recursive: ( enabled?:boolean ) => ParameterQuery;
    decryption: ( enabled?: boolean ) => ParameterQuery;
    execute: () => Promise<SSM.ParameterList>;
    executeSync: () => any; 
}
    