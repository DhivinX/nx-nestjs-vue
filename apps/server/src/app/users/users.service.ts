import crypto from 'crypto';
import {
    ConflictException,
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { User } from '@/app/db/user.entity';
import { hashPassword } from '@/app/auth/utils/hash-password';
import { ConfigService } from '@nestjs/config';
import {
    UserProfileResponse,
    UserCreateDto,
    UserUpdateDto,
    UserUpdateSelfDto,
    UserUpdateSelfPasswordDto,
    PaginationResponse,
    PaginationDto,
} from '@nx-vnts/shared';

@Injectable()
export class UsersService {
    constructor(private readonly configService: ConfigService) {}

    getProfile(user: User): UserProfileResponse {
        const { id, email, firstName, lastName, position, role, isActive, createdAt } = user;
        const avatar = this.getAvatar(email);
        return { id, email, firstName, lastName, position, avatar, role, isActive, createdAt };
    }

    private updateProfile(user: User, userUpdateSelfDto: UserUpdateSelfDto): User {
        user.firstName = userUpdateSelfDto.firstName;
        user.lastName = userUpdateSelfDto.lastName;
        user.position = userUpdateSelfDto.position;
        return user;
    }

    private getAvatar(email: string): string {
        const hash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
        const avatar = `https://www.gravatar.com/avatar/${hash}?s=200&d=mp`;
        return avatar;
    }

    async updateSelf(
        user: User,
        userUpdateSelfDto: UserUpdateSelfDto
    ): Promise<UserProfileResponse> {
        user = this.updateProfile(user, userUpdateSelfDto);

        await user.save();
        return this.getProfile(user);
    }

    async updateSelfPassword(
        user: User,
        userUpdateSelfPasswordDto: UserUpdateSelfPasswordDto
    ): Promise<UserProfileResponse> {
        const oldHash = hashPassword(
            userUpdateSelfPasswordDto.password,
            this.configService.get<string>('keys.pwdsalt')
        );

        if (user.hash === oldHash) {
            user.hash = hashPassword(
                userUpdateSelfPasswordDto.newPassword,
                this.configService.get<string>('keys.pwdsalt')
            );
        } else {
            throw new ForbiddenException('Wrong password');
        }

        await user.save();
        return this.getProfile(user);
    }

    async createOne(userCreateDto: UserCreateDto): Promise<UserProfileResponse> {
        const findUser = await User.findOneBy({ email: userCreateDto.email });

        if (findUser) throw new ConflictException('A user with this email address already exists');

        const user: User = new User();

        user.email = userCreateDto.email;
        user.hash = hashPassword(
            userCreateDto.password,
            this.configService.get<string>('keys.pwdsalt')
        );
        user.firstName = userCreateDto.firstName;
        user.lastName = userCreateDto.lastName;
        if (userCreateDto.role) user.role = userCreateDto.role;

        await user.save();
        return this.getProfile(user);
    }

    async getMany(paginationDto: PaginationDto): Promise<PaginationResponse<UserProfileResponse>> {
        const [foundUsers, total] = await User.findAndCount({
            take: paginationDto.take,
            skip: (paginationDto.page - 1) * paginationDto.take,
            order: {
                role: 'DESC',
                firstName: 'ASC',
            },
        });

        const users: UserProfileResponse[] = [];

        for (const user of foundUsers) {
            users.push(this.getProfile(user));
        }

        return {
            page: paginationDto.page,
            pages: Math.ceil(total / paginationDto.take),
            total: total,
            elements: users,
        };
    }

    async getOne(id: string): Promise<UserProfileResponse> {
        const foundUser = await User.findOneBy({ id });

        if (!foundUser) throw new NotFoundException();
        return this.getProfile(foundUser);
    }

    async updateOne(id: string, userUpdateDto: UserUpdateDto): Promise<UserProfileResponse> {
        const foundUser = await User.findOneBy({ id });

        if (!foundUser) throw new NotFoundException();

        const user = this.updateProfile(foundUser, userUpdateDto);

        if (userUpdateDto.password.length)
            user.hash = hashPassword(
                userUpdateDto.password,
                this.configService.get<string>('keys.pwdsalt')
            );

        user.isActive = userUpdateDto.isActive;
        user.role = userUpdateDto.role;

        await user.save();
        return this.getProfile(user);
    }

    async deleteOne(id: string): Promise<number> {
        const query = await User.delete({ id });

        if (query.affected === 0) throw new NotFoundException();
        return query.affected;
    }
}
