import { UserProfileResponse } from '../../users/responses/user-profile.response';

export interface AuthLoginResponse {
    expirationTime: number;
    account: UserProfileResponse;
}
