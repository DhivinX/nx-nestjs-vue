import { Role } from '@nx-vnts/shared';
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import { AuthMeta, useAuthGuard } from './guards';
import { routes } from './routes';

declare module 'vue-router' {
    export interface RouteMeta {
        auth: AuthMeta;
        roles?: Role[];
    }
}

console.log(import.meta.url);

const router = createRouter({
    history: import.meta.url.includes('app://')
        ? createWebHashHistory(import.meta.env.BASE_URL)
        : createWebHistory(import.meta.env.BASE_URL),
    routes,
});

useAuthGuard(router);

export default router;
