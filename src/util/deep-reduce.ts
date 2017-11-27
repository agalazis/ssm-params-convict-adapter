import { isObject } from 'lodash';
export const deepReduce = (
  obj: any, iterator: any, accInitializer: any, context = obj, path?: string | undefined, root = obj,
) => {
  return obj.reduce((acc: any, val: any, key: string) => {
      isObject(val) /*&& !_.isDate(val)*/ ?
                          deepReduce(val, iterator, acc, context, path && `${path}.${key}` || key, root) :
                          iterator.call(context, acc, val, key, obj, path, root);
      return acc;
  });
}