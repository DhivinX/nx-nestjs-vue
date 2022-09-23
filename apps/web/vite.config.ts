import path from 'path';
import { defineConfig } from 'vite';
import tsconfigBase from '../../tsconfig.base.json';
import Vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';
import vueI18n from '@intlify/vite-plugin-vue-i18n';
import checker from 'vite-plugin-checker';
import electron, { onstart } from 'vite-plugin-electron';

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

        process.env.VITE_DISABLE_VUE_TSC === 'true'
            ? null
            : checker({
                  vueTsc: true,
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

        process.env.VITE_DEV_MODE === 'electron'
            ? electron({
                  main: {
                      entry: path.join(__dirname, 'electron/main/index.ts'),
                      vite: {
                          build: {
                              // For Debug
                              sourcemap: true,
                              outDir: 'dist/apps/web/electron/main',
                          },
                          // Will start Electron via VSCode Debug
                          plugins: [process.env.VSCODE_DEBUG ? onstart() : null],
                      },
                  },
                  preload: {
                      input: {
                          // You can configure multiple preload here
                          index: path.join(__dirname, 'electron/preload/index.ts'),
                      },
                      vite: {
                          build: {
                              // For Debug
                              sourcemap: 'inline',
                              outDir: 'dist/apps/web/electron/preload',
                          },
                      },
                  },
                  // Enables use of Node.js API in the Renderer-process
                  // https://github.com/electron-vite/vite-plugin-electron/tree/main/packages/electron-renderer#electron-renderervite-serve
                  renderer: {},
              })
            : null,
    ],
};

export default defineConfig(viteConfig);
