interface Config {
    defaultLocale: string;
    useCookies: boolean;
    api: {
        host: string;
        port: number;
    };
}

export const config: Config = {
    defaultLocale: 'en',
    useCookies: import.meta.env.VITE_DEV_MODE !== 'electron',

    api: {
        host: `http://localhost`,
        port: 3000,
    },
};
