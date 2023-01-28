import { Command, CommandRunner } from 'nest-commander';
import { UsersService } from '@/app/users/users.service';
import { ConflictException, Logger } from '@nestjs/common';
import { usersSeedData } from './seed/seed-data';
import { timeout, UserCreateDto } from '@workspace/shared';

@Command({
    name: 'seed',
    description: 'Seed initial data to database',
})
export class SeedCommand extends CommandRunner {
    private readonly logger = new Logger(SeedCommand.name);

    constructor(private readonly usersService: UsersService) {
        super();
    }

    async run(): Promise<void> {
        await this.createTestUsers(usersSeedData);
    }

    async createTestUsers(users: UserCreateDto[]) {
        for (const _user of users) {
            this.logger.verbose(`Creating account: ${_user.email}`);
            await timeout(200);

            try {
                const user = await this.usersService.createOne(_user);
                this.logger.verbose(`Account has been created! ID: ${user.id}`);
            } catch (e) {
                if (e instanceof ConflictException) {
                    this.logger.error('The account already exists');
                } else {
                    this.logger.error(e);
                }
            }
        }
    }
}
