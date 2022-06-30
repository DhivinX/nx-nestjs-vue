import { UserProfileResponse } from '../../users/responses/user-profile.response';

export interface AuthLoginResponse {
    token?: string;
    expirationTime: number;
    account: UserProfileResponse;
}
