import { boolean, mixed, SchemaOf, setLocale, string } from 'yup';
import { UseSchema, yupLocale } from '@nx-vnts/utils';
import { UserUpdateSelfDto, userUpdateSelfSchema } from './user-update-self.input';
import { Role } from '../../common';

setLocale(yupLocale);

export const userUpdateSchema: SchemaOf<UserUpdateDto> = userUpdateSelfSchema.shape({
    password: string().when({
        is: (val: string | null) => val.length && val.length > 0,
        then: string().min(6),
    }),

    isActive: boolean().required(),
    role: mixed().oneOf(Object.values(Role)),
});

@UseSchema(userUpdateSchema)
export class UserUpdateDto extends UserUpdateSelfDto {
    password: string;
    isActive: boolean;
    role: Role;
}
