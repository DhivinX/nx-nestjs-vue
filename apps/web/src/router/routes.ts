import type { RouteRecordRaw } from 'vue-router';
import { AuthMeta } from './guards';
import { Role } from '@nx-vnts/shared';

import DefaultLayout from '@/app/layouts/DefaultLayout.vue';
import AppLayout from '@/app/layouts/AppLayout.vue';
import LoginPage from '@/app/pages/LoginPage.vue';
import DashboardPage from '@/app/pages/DashboardPage.vue';
import UsersIndex from '@/app/pages/users/UsersIndex.vue';
import UserPage from '@/app/pages/users/UserPage.vue';
import UsersPage from '@/app/pages/users/UsersPage.vue';
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
                path: '/users',
                component: UsersIndex,
                children: [
                    {
                        path: '',
                        name: 'users',
                        component: UsersPage,
                        meta: {
                            auth: AuthMeta.Required,
                            roles: [Role.Admin],
                        },
                    },
                    {
                        path: ':id',
                        name: 'user',
                        component: UserPage,
                        meta: {
                            auth: AuthMeta.Required,
                            roles: [Role.Admin],
                        },
                    },
                ],
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
