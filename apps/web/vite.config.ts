import path from 'path';
import { defineConfig } from 'vite';
import tsconfigBase from '../../tsconfig.base.json';
import Vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';
import vueI18n from '@intlify/vite-plugin-vue-i18n';
import checker from 'vite-plugin-checker';

const resolve = (p: string) => path.resolve(__dirname, p);

const tsconfigBaseAliases = (rootOffset: string): Record<string, string> => {
    const paths = tsconfigBase.compilerOptions?.paths || [];
    const aliases: Record<string, string> = {};

    for (const [name, path] of Object.entries(paths))
        aliases[name] = resolve(`${rootOffset}/${path}`);

    return aliases;
};

export default defineConfig({
    server: {
        host: true,
        port: 8080,
    },

    clearScreen: true,
    assetsInclude: /\.(pdf|jpg|png|svg)$/,

    resolve: {
        alias: {
            '@/': `${resolve('./src')}/`,
            ...tsconfigBaseAliases('../..'),
        },
    },

    publicDir: resolve('./src/public'),

    plugins: [
        Vue({
            template: {
                transformAssetUrls,
            },
        }),

        checker({
            vueTsc: {
                tsconfigPath: resolve('./tsconfig.json'),
            },
        }),

        vueI18n({
            include: resolve('./src/locales/**'),
        }),

        quasar({
            sassVariables: resolve('./src/assets/quasar.scss'),
        }),

        Components({
            dirs: ['src/app/components'],
        }),
    ],
});
