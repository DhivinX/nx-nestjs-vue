import { boolean, mixed, setLocale, string, ObjectSchema } from 'yup';
import { UseSchema, yupLocale } from '@workspace/shared';
import { UserUpdateSelfDto, userUpdateSelfSchema } from './user-update-self.input';
import { Role } from '../../common';

setLocale(yupLocale);

export const userUpdateSchema: ObjectSchema<UserUpdateDto> = userUpdateSelfSchema.shape({
    password: string().when({
        is: (val: string | null) => val.length && val.length > 0,
        then: (schema) => schema.min(6),
    }),

    isActive: boolean().required(),
    role: mixed<Role>().oneOf(Object.values(Role)),
});

@UseSchema(userUpdateSchema)
export class UserUpdateDto extends UserUpdateSelfDto {
    password: string;
    isActive: boolean;
    role: Role;
}
