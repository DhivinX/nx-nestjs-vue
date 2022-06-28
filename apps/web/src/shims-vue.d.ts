/// <reference types="vite/client" />

declare module '*.vue' {
    import type { DefineComponent } from 'vue';
    // eslint-disable-next-line
    const component: DefineComponent<{}, {}, any>;
    export default component;
}

declare module '@intlify/vite-plugin-vue-i18n/messages' {
    import { LocaleMessages } from '@intlify/core-base';
    import { VueMessageType } from 'vue-i18n';
    const messages: LocaleMessages<VueMessageType>;
    export default messages;
}
