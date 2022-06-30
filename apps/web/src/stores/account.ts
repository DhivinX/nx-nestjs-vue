import { defineStore } from 'pinia';
import { useCookies } from '@vueuse/integrations/useCookies';
import { computed, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';
import type { Role, UserProfileResponse } from '@nx-vnts/shared';
import { usePromiseState, api } from '@/common';
import { useStorage } from '@vueuse/core';
import { isElectronProtocol } from '@/common/electron';

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
    const cookies = useCookies(['token_exp']);
    const storageTokenExp = useStorage('token_exp', -1);

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

    function checkAuthCookie(): void {
        if (state.authenticated) return;

        const tokenExpiration = isElectronProtocol
            ? storageTokenExp.value
            : cookies.get<number>('token_exp');

        if (tokenExpiration && tokenExpiration !== -1) {
            if (tokenExpiration - Date.now() > 0) {
                setAuthenticated(true);
            } else {
                if (isElectronProtocol) storageTokenExp.value = -1;
                else cookies.remove('token_exp');

                $q.notify({
                    icon: 'mdi-cookie',
                    message: t('account.session_exp'),
                    timeout: 2000,
                });
            }
        }
    }

    function setAuthenticated(authState: boolean, expirationTime?: number) {
        state.authenticated = authState;

        if (authState) {
            if (expirationTime !== undefined) {
                if (isElectronProtocol) storageTokenExp.value = expirationTime;
                else cookies.set('token_exp', expirationTime);
            }
        } else {
            reset();

            if (isElectronProtocol) storageTokenExp.value = -1;
            else cookies.remove('token_exp');

            router.push({ name: 'login' });
        }
    }

    return { state, checkAuthCookie, setAuthenticated, load, reset, fetch: accountAction.execute };
});
