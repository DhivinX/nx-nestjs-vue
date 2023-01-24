import path from 'path';
import { defineConfig } from 'vite';
import tsconfigBase from '../../tsconfig.base.json';
import Vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';
import vueI18n from '@intlify/vite-plugin-vue-i18n';
import checker from 'vite-plugin-checker';
import electron from 'vite-plugin-electron';

const resolve = (p: string) => path.resolve(__dirname, p);

const tsconfigBaseAliases = (rootOffset: string): Record<string, string> => {
    const paths = tsconfigBase.compilerOptions?.paths || [];
    const aliases: Record<string, string> = {};

    for (const [name, path] of Object.entries(paths))
        aliases[name] = resolve(`${rootOffset}/${path}`);

    return aliases;
};

const viteConfig = {
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

        process.env.VITE_DISABLE_VUE_TSC
            ? null
            : checker({
                  vueTsc: true,
              }),

        vueI18n({
            defaultSFCLang: 'yaml',
            include: resolve('./src/locales/**'),
        }),

        quasar({
            sassVariables: resolve('./src/assets/quasar.scss'),
        }),

        Components({
            dirs: ['src/app/components'],
        }),

        process.env.VITE_IS_ELECTRON_APP
            ? electron([
                  {
                      entry: path.join(__dirname, 'electron/main/index.ts'),
                      vite: {
                          build: {
                              sourcemap: true,
                              outDir: 'dist/apps/web/electron/main',
                          },
                      },
                  },

                  {
                      entry: path.join(__dirname, 'electron/preload/index.ts'),
                      vite: {
                          build: {
                              sourcemap: 'inline',
                              outDir: 'dist/apps/web/electron/preload',
                          },
                      },
                      onstart(options) {
                          options.reload();
                      },
                  },
              ])
            : null,
    ],
};

export default defineConfig(viteConfig);
