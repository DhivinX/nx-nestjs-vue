import { object, SchemaOf, setLocale, string } from 'yup';
import { UseSchema, yupLocale } from '@nx-vnts/utils';

setLocale(yupLocale);

export const userUpdateSelfSchema: SchemaOf<UserUpdateSelfDto> = object().shape({
    firstName: string().required(),
    lastName: string().required(),
    position: string().defined().nullable(),
});

@UseSchema(userUpdateSelfSchema)
export class UserUpdateSelfDto {
    firstName: string;
    lastName: string;
    position: string | null;
}
