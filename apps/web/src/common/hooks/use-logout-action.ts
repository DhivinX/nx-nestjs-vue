import { useAccountStore } from '@/stores/account';
import { useQuasar, type DialogChainObject } from 'quasar';
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { api } from '../api';
import { usePromiseState } from './use-promise-state';

export function useLogoutAction() {
    const router = useRouter();
    const $q = useQuasar();
    const { t } = useI18n();

    const accountStore = useAccountStore();

    let dialog: DialogChainObject | undefined = undefined;

    function showLogoutDialog() {
        dialog = $q.dialog({
            message: t('account.logout_progress'),
            progress: true,
            persistent: true,
            ok: false,
            color: 'primary',
        });
    }

    function hideLogoutDialog() {
        if (dialog) dialog.hide();
    }

    const logoutAction = usePromiseState(
        async () => {
            await api.auth.logout();
            accountStore.setAuthenticated(false);
            hideLogoutDialog();

            $q.notify({
                icon: 'mdi-check',
                color: 'positive',
                message: t('account.logout_success'),
                timeout: 1000,
            });

            router.push({ name: 'login' });
        },
        () => {
            hideLogoutDialog();

            $q.notify({
                icon: 'mdi-close',
                color: 'negative',
                message: t('account.logout_failed'),
                timeout: 1000,
            });
        }
    );

    function logout() {
        showLogoutDialog();
        logoutAction.execute(500);
    }

    return reactive({ logout, ...logoutAction });
}
