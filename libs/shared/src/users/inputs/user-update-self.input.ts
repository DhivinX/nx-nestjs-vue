import { object, SchemaOf, setLocale, string } from 'yup';
import { UseSchema, yupLocale } from '@workspace/utils';

setLocale(yupLocale);

export const userUpdateSelfSchema: SchemaOf<UserUpdateSelfDto> = object().shape({
    firstName: string().required().trim(),
    lastName: string().required().trim(),
    position: string().defined().nullable().trim(),
});

@UseSchema(userUpdateSelfSchema)
export class UserUpdateSelfDto {
    firstName: string;
    lastName: string;
    position: string | null;
}
