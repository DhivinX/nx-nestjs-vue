import { AuthLoginDto } from '@nx-vnts/shared';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { AuthSession } from './decorators/auth-session.decorator';
import { AuthLoginResponse } from '@nx-vnts/shared';
import { Session } from '@/app/db/session.entity';
import { Public } from './decorators/public.decorator';

@Controller('/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post('/login')
    async login(
        @AuthSession() session: Session,
        @Body() authLoginDto: AuthLoginDto,
        @Res({ passthrough: true }) response: Response
    ): Promise<AuthLoginResponse> {
        return this.authService.login(session, authLoginDto, response);
    }

    @Post('/logout')
    async logout(
        @AuthSession() session: Session,
        @Res({ passthrough: true }) response: Response
    ): Promise<boolean> {
        return this.authService.logout(session, response);
    }
}
