import { UsersService } from '@/app/users/users.service';
import { Role } from '@workspace/shared';
import { ConflictException, Injectable } from '@nestjs/common';
import { Command, Console } from 'nestjs-console';

@Injectable()
@Console()
export class CliService {
    constructor(private readonly usersService: UsersService) {}

    @Command({
        command: 'newuser <email> <password> <role> <firstname> <lastname>',
        description: 'Create new user account',
    })
    async commandCreateUser(
        email: string,
        password: string,
        role: Role,
        firstName: string,
        lastName: string
    ): Promise<void> {
        try {
            await this.usersService.createOne({
                email,
                role,
                password,
                firstName,
                lastName,
            });

            console.log('Account has been created');
        } catch (e) {
            if (e instanceof ConflictException) {
                console.log('Account already exists');
            }
        }
    }
}
