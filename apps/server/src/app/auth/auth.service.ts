import { AuthLoginDto, AuthLoginResponse } from '@nx-vnts/shared';
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import { v4 as uuid } from 'uuid';
import { sign } from 'jsonwebtoken';
import { LessThan } from 'typeorm';
import { JwtPayload } from './strategies/jwt.strategy';
import { hashPassword } from './utils/hash-password';
import { User } from '@/app/db/user.entity';
import { Session } from '@/app/db/session.entity';
import { UsersService } from '@/app/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly configService: ConfigService,
        private readonly usersService: UsersService
    ) {}

    async login(
        oldSession: Session,
        authLoginDto: AuthLoginDto,
        response: Response
    ): Promise<AuthLoginResponse> {
        const user = await User.findOne({
            where: {
                email: authLoginDto.email,
                hash: hashPassword(
                    authLoginDto.password,
                    this.configService.get<string>('keys.pwdsalt')
                ),
            },
        });

        if (!user) {
            throw new UnauthorizedException('Invalid login data');
        }

        let maxAge: number = 24 * 60 * 60 * 1000;
        if (authLoginDto.remember) maxAge = 365 * 24 * 60 * 60 * 1000;

        const expirationTime = Date.now() + maxAge;
        const session = await this.generateSession(oldSession, user, expirationTime);
        const signedToken = this.createToken(session.token);

        const secure = this.configService.get<boolean>('http.secure');

        response.cookie('jwt', signedToken, {
            secure: secure,
            sameSite: secure ? 'none' : 'lax',
            //domain: this.configService.get<string>('http.domain'),
            httpOnly: true,
            maxAge,
        });

        const account = await this.usersService.getProfile(session.user);

        return {
            expirationTime,
            account,
        };
    }

    async logout(session: Session, response: Response): Promise<boolean> {
        await session.remove();

        const secure = this.configService.get<boolean>('http.secure');

        response.clearCookie('jwt', {
            secure: secure,
            sameSite: secure ? 'none' : 'lax',
            //domain: this.configService.get<string>('http.domain'),
            httpOnly: true,
        });

        return true;
    }

    private createToken(token: string): string {
        const payload: JwtPayload = {
            id: token,
        };

        const accessToken: string = sign(
            payload,
            this.configService.get<string>('keys.jwt')
        ) as string;

        return accessToken;
    }

    private async generateSession(
        session: Session,
        user: User,
        expirationTime: number
    ): Promise<Session> {
        let token: string;
        let sessionWithThisToken: Session | null = null;

        do {
            token = uuid() as string;
            sessionWithThisToken = await Session.findOne({
                where: {
                    token,
                },
            });
        } while (sessionWithThisToken);

        if (session) {
            session.token = token;
            session.exp = expirationTime;
        } else {
            session = new Session();
            session.user = user;
            session.token = token;
            session.exp = expirationTime;
        }

        await session.save();

        return session;
    }

    async cleanExpiredSessions(): Promise<number> {
        const { affected } = await Session.delete({
            exp: LessThan(Date.now()),
        });

        return affected;
    }
}
