import { Session } from '@/app/db/session.entity';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthSession = createParamDecorator((data, context: ExecutionContext): Session => {
    return context.switchToHttp().getRequest().userSession;
});
