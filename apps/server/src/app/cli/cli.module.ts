import { UsersModule } from '@/app/users/users.module';
import { Module } from '@nestjs/common';
import { SeedCommand } from './seed.command';

@Module({
    imports: [UsersModule],
    providers: [SeedCommand],
})
export class CliModule {}
