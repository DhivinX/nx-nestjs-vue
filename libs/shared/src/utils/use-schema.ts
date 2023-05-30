import { ObjectSchema } from 'yup';

export function UseSchema(schema: ObjectSchema<any>) {
    return function (target) {
        target.prototype.schema = schema;
    };
}
