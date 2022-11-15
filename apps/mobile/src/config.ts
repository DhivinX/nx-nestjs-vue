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
    useCookies: true,

    api: {
        host: `http://localhost`,
        port: 3000,
    },
};
