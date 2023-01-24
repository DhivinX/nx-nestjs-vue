import { bool, object, SchemaOf, string } from 'yup';
import { setLocale } from 'yup';
import { UseSchema, yupLocale } from '@workspace/utils';

setLocale(yupLocale);

export const authLoginSchema: SchemaOf<AuthLoginDto> = object().shape({
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
