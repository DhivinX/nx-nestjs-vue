interface Config {
    defaultLocale: string;
    api: {
        host: string;
        port: number;
    };
}

const host = window.location.hostname;

export const config: Config = {
    defaultLocale: 'en',

    api: {
        host: `http://${host}`,
        port: 3000,
    },
};
