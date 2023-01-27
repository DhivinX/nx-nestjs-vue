/// <reference types="vitest" />

import path from 'path';
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import checker from 'vite-plugin-checker';
import viteTsConfigPaths from 'vite-tsconfig-paths';

const resolve = (p: string) => path.resolve(__dirname, p);

export default defineConfig({
    server: {
        host: true,
        port: 8090,

        fs: {
            allow: ['../..'],
        },
    },

    base: './',
    cacheDir: '../../node_modules/.vite-mobile',
    clearScreen: true,
    assetsInclude: /\.(pdf|jpg|png|svg)$/,

    resolve: {
        alias: {
            '@/': `${resolve('./src')}/`,
        },
    },

    publicDir: resolve('./src/public'),

    plugins: [
        viteTsConfigPaths({
            projects: [resolve('../../tsconfig.base.json')],
        }),

        Vue({
            template: {
                transformAssetUrls,
            },
        }),

        process.env.VITE_DISABLE_VUE_TSC
            ? null
            : checker({
                  vueTsc: true,
              }),

        VueI18nPlugin({
            defaultSFCLang: 'yaml',
            include: resolve('./src/locales/**'),
        }),

        quasar({
            sassVariables: resolve('./src/assets/quasar.scss'),
        }),

        Components({
            dts: resolve('./src/components.d.ts'),
            dirs: ['src/app/components'],
        }),
    ],

    test: {
        globals: true,
        cache: {
            dir: '../../node_modules/.vitest',
        },
        environment: 'jsdom',
        include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    },
});
