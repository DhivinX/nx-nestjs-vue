import { RouteRecordRaw } from 'vue-router';
import { AuthMeta } from './guards';

import DefaultLayout from '@/app/layouts/DefaultLayout.vue';
import AppLayout from '@/app/layouts/AppLayout.vue';
import LoginPage from '@/app/pages/LoginPage.vue';
import DashboardPage from '@/app/pages/DashboardPage.vue';
import SettingsPage from '@/app/pages/SettingsPage.vue';

export const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: DefaultLayout,
        children: [
            {
                path: '/',
                name: 'login',
                component: LoginPage,
                meta: {
                    auth: AuthMeta.None,
                },
            },
        ],
    },
    {
        path: '/app',
        component: AppLayout,
        children: [
            {
                path: '/dashboard',
                name: 'dashboard',
                component: DashboardPage,
                meta: {
                    auth: AuthMeta.Required,
                },
            },
            {
                path: '/settings',
                name: 'settings',
                component: SettingsPage,
                meta: {
                    auth: AuthMeta.Required,
                },
            },
        ],
    },
];
