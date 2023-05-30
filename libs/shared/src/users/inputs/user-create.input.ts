import { mixed, object, ObjectSchema, setLocale, string } from 'yup';
import { UseSchema, yupLocale } from '@workspace/shared';
import { Role } from '../../common';

setLocale(yupLocale);

export const userCreateSchema: ObjectSchema<UserCreateDto> = object().shape({
    email: string().required().email().lowercase().trim(),
    password: string().required().min(6),
    firstName: string().required().trim(),
    lastName: string().required().trim(),
    role: mixed<Role>().optional().oneOf(Object.values(Role)),
});

@UseSchema(userCreateSchema)
export class UserCreateDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role?: Role;
}
