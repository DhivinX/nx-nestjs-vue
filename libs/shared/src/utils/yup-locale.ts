import { LocaleObject } from 'yup/lib/locale';
import { MessageParams } from 'yup/lib/types';

function toObject(key: string, values?: MessageParams) {
    delete values?.originalValue;
    delete values?.value;

    return {
        k: key,
        v: values,
    };
}

export const yupLocale: LocaleObject = {
    mixed: {
        default: (v) => toObject('field_default', v),
        required: (v) => toObject('field_required', v),
        oneOf: (v) => toObject('field_oneof', v),
        notOneOf: (v) => toObject('field_notoneof', v),
        notType: (v) => toObject('field_nottype', v),
        defined: (v) => toObject('field_defined', v),
    },

    string: {
        length: (v) => toObject('string_length', v),
        min: (v) => toObject('string_min', v),
        max: (v) => toObject('string_max', v),
        matches: (v) => toObject('string_matches', v),
        email: (v) => toObject('string_email', v),
        url: (v) => toObject('string_url', v),
        uuid: (v) => toObject('string_uuid', v),
        trim: (v) => toObject('string_trim', v),
        lowercase: (v) => toObject('string_lowercase', v),
        uppercase: (v) => toObject('string_uppercase', v),
    },

    number: {
        min: (v) => toObject('number_min', v),
        max: (v) => toObject('number_max', v),
        lessThan: (v) => toObject('number_lessthan', v),
        moreThan: (v) => toObject('number_morethan', v),
        positive: (v) => toObject('number_positive', v),
        negative: (v) => toObject('number_negative', v),
        integer: (v) => toObject('number_integer', v),
    },

    date: {
        min: (v) => toObject('date_min', v),
        max: (v) => toObject('date_max', v),
    },

    boolean: {
        isValue: (v) => toObject('boolean_isvalue', v),
    },

    object: {
        noUnknown: (v) => toObject('object_nounknown', v),
    },

    array: {
        length: (v) => toObject('array_length', v),
        min: (v) => toObject('array_min', v),
        max: (v) => toObject('array_max', v),
    },
};
