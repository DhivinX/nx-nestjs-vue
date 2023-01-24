import { Role } from '@workspace/shared';
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import { AuthMeta, useAuthGuard } from './guards';
import { routes } from './routes';

declare module 'vue-router' {
    export interface RouteMeta {
        auth: AuthMeta;
        roles?: Role[];
    }
}

const router = createRouter({
    history: import.meta.env.VITE_IS_ELECTRON_APP
        ? createWebHashHistory(import.meta.env.BASE_URL)
        : createWebHistory(import.meta.env.BASE_URL),
    routes,
});

useAuthGuard(router);

export default router;
