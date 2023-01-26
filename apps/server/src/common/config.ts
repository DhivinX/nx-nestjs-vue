import { object, number, string, boolean, ValidationError, array } from 'yup';

const configSchema = object().shape({
    http: object({
        port: number().nullable().optional().default(3000),
        ssl: boolean().nullable().optional().default(false),
        key: string().nullable().optional(),
        cert: string().nullable().optional(),
        cors: array()
            .nullable()
            .optional()
            .default(['http://localhost'])
            .transform((_, v) => {
                return JSON.parse(v);
            })
            .of(string()),
    }),

    db: object({
        type: string().nullable().optional().default('postgres'),
        host: string().nullable().optional().default('localhost'),
        port: number().nullable().optional().default(3000),
        name: string().required(),
        user: string().required(),
        password: string().required(),
        synchronize: boolean().nullable().optional().default(true),
    }),

    secrets: object({
        pwdsalt: string().required(),
        jwt: string().required(),
    }),
});

export const config = () => {
    try {
        const _config = {
            http: {
                port: process.env.NEST_API_HTTP_PORT,
                ssl: process.env.NEST_API_HTTP_SSL,
                key: process.env.NEST_API_HTTP_KEY,
                cert: process.env.NEST_API_HTTP_CERT,
                cors: process.env.NEST_API_HTTP_CORS,
            },

            db: {
                type: process.env.DATABASE_TYPE,
                host: process.env.DATABASE_HOST,
                port: process.env.DATABASE_PORT,

                name: process.env.DATABASE_NAME,
                user: process.env.DATABASE_USER,
                password: process.env.DATABASE_PASSWORD,
                synchronize: process.env.DATABASE_ENABLE_SYNC,
            },

            secrets: {
                pwdsalt: process.env.NEST_API_SECRETS_PWDSALT,
                jwt: process.env.NEST_API_SECRETS_JWT,
            },
        };

        return configSchema.validateSync(_config);
    } catch (err) {
        throw new Error((err as ValidationError).message);
    }
};
