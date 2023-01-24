import { RouteRecordRaw } from 'vue-router';
import { AuthMeta } from './middlewares';

import DefaultLayout from '@/app/layouts/DefaultLayout.vue';
import AppLayout from '@/app/layouts/AppLayout.vue';
import LoginPage from '@/app/pages/LoginPage.vue';

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
                component: () => import('@/app/pages/DashboardPage.vue'),
                meta: {
                    auth: AuthMeta.Required,
                },
            },
            {
                path: '/settings',
                name: 'settings',
                component: () => import('@/app/pages/SettingsPage.vue'),
                meta: {
                    auth: AuthMeta.Required,
                },
            },
        ],
    },
];
