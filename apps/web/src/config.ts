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
    useCookies: !import.meta.env.VITE_IS_ELECTRON_APP,

    api: {
        host: `http://localhost`,
        port: 3000,
    },
};
