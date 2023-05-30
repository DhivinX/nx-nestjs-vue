import { object, ObjectSchema, setLocale, string } from 'yup';
import { UseSchema, yupLocale } from '@workspace/shared';

setLocale(yupLocale);

export const userUpdateSelfSchema: ObjectSchema<UserUpdateSelfDto> = object().shape({
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
