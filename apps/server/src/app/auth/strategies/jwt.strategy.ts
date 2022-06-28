import { Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Session } from '@/app/db/session.entity';

export interface JwtPayload {
    id: string;
}

function cookieExtractor(req: any): null | string {
    return req && req.cookies ? (req.cookies?.jwt as string) ?? null : null;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(configService: ConfigService) {
        super({
            jwtFromRequest: cookieExtractor,
            secretOrKey: configService.get<string>('keys.jwt'),
        });
    }

    async validate(payload: JwtPayload) {
        if (!payload || !payload.id) {
            throw new UnauthorizedException();
        }

        const userSession = await Session.findOne({
            relations: ['user'],

            where: {
                token: payload.id,
            },
        });

        if (!userSession) {
            throw new UnauthorizedException();
        }

        userSession.lastSeen = new Date();
        userSession.save();

        return userSession;
    }
}
