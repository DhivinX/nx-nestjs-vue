import { object, ref, SchemaOf, setLocale, string } from 'yup';
import { UseSchema, yupLocale } from '@nx-vnts/utils';

setLocale(yupLocale);

export const userUpdateSelfPasswordSchema: SchemaOf<UserUpdateSelfPasswordDto> = object().shape({
    password: string().required().min(6),
    newPassword: string().required().min(6),
    repeatPassword: string()
        .required()
        .oneOf([ref('newPassword'), null], 'string_password_repeat'),
});

@UseSchema(userUpdateSelfPasswordSchema)
export class UserUpdateSelfPasswordDto {
    password: string;
    newPassword: string;
    repeatPassword: string;
}
