interface Config {
    defaultLocale: string;
    api: {
        host: string;
        port: number;
    };
}

export const config: Config = {
    defaultLocale: 'en',

    api: {
        host: `http://localhost`,
        port: 3000,
    },
};
