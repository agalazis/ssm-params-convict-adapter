import { isObject, reduce } from 'lodash';
export const deepReduce = (
  obj: any,
  iterator: any,
  accInitializer: any,
  context = obj,
  path?: string | undefined,
  root = obj,
) => {
  return reduce(
    obj,
    (acc: any, val: any, key: string) => {
      iterator.call(context, acc, val, key, obj, path, root);
      if (isObject(val)) {
        /*&& !_.isDate(val)*/
        deepReduce(
          val,
          iterator,
          acc,
          context,
          (path && `${path}.${key}`) || key,
          root,
        );
      }
      return acc;
    },
    accInitializer,
  );
};
