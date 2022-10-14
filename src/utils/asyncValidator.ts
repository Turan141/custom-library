// Core
import get from 'lodash/get';
import set from 'lodash/set';

export const asyncValidator = (schema: any) => (values: any) =>
  schema.validate(values, { abortEarly: false }).catch((error: any) => {
    const errors = {};

    get(error, 'inner', []).forEach(({ message, path }: any) => {
      set(errors, path, message);
    });

    throw errors;
  });
