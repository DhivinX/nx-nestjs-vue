import { mixed, object, SchemaOf, setLocale, string } from 'yup';
import { UseSchema, yupLocale } from '@nx-vnts/utils';
import { Role } from '../../common';

setLocale(yupLocale);

export const userCreateSchema: SchemaOf<UserCreateDto> = object().shape({
    email: string().required().email().lowercase(),
    password: string().required().min(6),
    firstName: string().required(),
    lastName: string().required(),
    role: mixed().optional().oneOf(Object.values(Role)),
});

@UseSchema(userCreateSchema)
export class UserCreateDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role?: Role;
}
