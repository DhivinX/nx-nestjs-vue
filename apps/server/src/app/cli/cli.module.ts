import { UsersModule } from '@/app/users/users.module';
import { Module } from '@nestjs/common';
import { ConsoleModule } from 'nestjs-console';
import { CliService } from './cli.service';

@Module({
    imports: [ConsoleModule, UsersModule],
    providers: [CliService],
})
export class CliModule {}
