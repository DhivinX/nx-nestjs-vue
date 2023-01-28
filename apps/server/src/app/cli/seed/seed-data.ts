import { Role, UserCreateDto } from '@workspace/shared';

export const usersSeedData: UserCreateDto[] = [
    {
        email: 'admin@admin.com',
        password: '123456',
        role: Role.Admin,
        firstName: 'John',
        lastName: 'Doe',
    },
];
