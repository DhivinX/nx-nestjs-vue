import { SchemaOf } from 'yup';

export function UseSchema(schema: SchemaOf<any>) {
    return function (target) {
        target.prototype.schema = schema;
    };
}
