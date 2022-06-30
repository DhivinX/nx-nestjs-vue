import { defineStore } from 'pinia';
import { useCookies } from '@vueuse/integrations/useCookies';
import { computed, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';
import type { AuthLoginResponse, Role, UserProfileResponse } from '@nx-vnts/shared';
import { usePromiseState, api } from '@/common';
import { useStorage } from '@vueuse/core';
import { clearAuthorizationToken, setAuthorizationToken } from '@/common/api';

interface State {
    authenticated: boolean;
    loaded: boolean;

    id: string;
    email: string;
    role: Role;
    firstName: string;
    lastName: string;
    position: string;
    avatar: string;
    createdAt: Date | null;

    fullname: string;
    roleName: string;
}

export const useAccountStore = defineStore('account', () => {
    const cookies = useCookies(['token', 'token_exp']);
    const storageToken = useStorage<string>('token', null);
    const storageTokenExp = useStorage<number>('token_exp', null);

    const router = useRouter();
    const $q = useQuasar();
    const { t } = useI18n();

    const initialState = {
        loaded: false,
        id: '',
        email: '',
        role: null,
        avatar: '',
        firstName: '',
        position: '',
        lastName: '',
        createdAt: null,
    };

    const state: State = reactive({
        authenticated: false,
        ...initialState,

        fullname: computed(() => {
            return `${state.firstName} ${state.lastName}`;
        }),

        roleName: computed(() => {
            if (state.role) return t(`roles.${state.role}`);
            else return null;
        }),
    });

    const accountAction = usePromiseState(async () => {
        const { data } = await api.users.getSelf();
        load(data);
    });

    function reset() {
        for (const [key, value] of Object.entries(initialState)) {
            state[key] = value;
        }
    }

    async function load(data: UserProfileResponse) {
        state.loaded = true;
        state.id = data.id;
        state.email = data.email;
        state.role = data.role;
        state.firstName = data.firstName;
        state.lastName = data.lastName;
        state.position = data.position;
        state.avatar = data.avatar;
        state.createdAt = new Date(data.createdAt);
    }

    function refreshAuthState(): void {
        if (state.authenticated) return;

        const tokenExpiration = storageToken.value
            ? storageTokenExp.value
            : cookies.get<number>('token_exp');

        if (tokenExpiration) {
            if (tokenExpiration - Date.now() > 0) {
                setAuthenticated(true);
            } else {
                cookies.remove('token_exp');
                storageToken.value = null;
                storageTokenExp.value = null;

                clearAuthorizationToken();

                $q.notify({
                    icon: 'mdi-cookie',
                    message: t('account.session_exp'),
                    timeout: 2000,
                });
            }
        }
    }

    function setAuthenticated(authState: boolean, loginResponse?: AuthLoginResponse) {
        state.authenticated = authState;

        if (authState) {
            if (loginResponse) {
                if (loginResponse.token) storageToken.value = loginResponse.token;

                if (loginResponse.expirationTime !== undefined) {
                    if (storageToken.value) storageTokenExp.value = loginResponse.expirationTime;
                    else cookies.set('token_exp', loginResponse.expirationTime);
                }
            }

            if (storageToken.value) setAuthorizationToken(storageToken.value);
        } else {
            reset();

            cookies.remove('token_exp');
            storageToken.value = null;
            storageTokenExp.value = null;

            clearAuthorizationToken();

            router.push({ name: 'login' });
        }
    }

    return { state, refreshAuthState, setAuthenticated, load, reset, fetch: accountAction.execute };
});
