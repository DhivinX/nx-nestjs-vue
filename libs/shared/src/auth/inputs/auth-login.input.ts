import { bool, object, ObjectSchema, string } from 'yup';
import { setLocale } from 'yup';
import { UseSchema, yupLocale } from '@workspace/shared';

setLocale(yupLocale);

export const authLoginSchema: ObjectSchema<AuthLoginDto> = object().shape({
    email: string().required().email().lowercase().trim(),
    password: string().required().min(6),
    remember: bool(),
    cookies: bool(),
});

@UseSchema(authLoginSchema)
export class AuthLoginDto {
    email: string;
    password: string;
    remember: boolean;
    cookies: boolean;
}
