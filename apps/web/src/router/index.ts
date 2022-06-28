import { Role } from '@nx-vnts/shared';
import { createRouter, createWebHistory } from 'vue-router';
import { AuthMeta, useAuthGuard } from './guards';
import { routes } from './routes';

declare module 'vue-router' {
    export interface RouteMeta {
        auth: AuthMeta;
        roles?: Role[];
    }
}

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

useAuthGuard(router);

export default router;
