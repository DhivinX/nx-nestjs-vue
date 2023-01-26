import express from 'express';
import * as http from 'http';
import * as https from 'https';
import fs from 'fs';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { AppModule } from './app/app.module';
import { YupValidationPipe } from './common';
import { ExpressAdapter } from '@nestjs/platform-express';
import { Logger } from '@nestjs/common';

async function bootstrap() {
    const server = express();
    const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

    const configService = app.get(ConfigService);
    const logger = new Logger('APP');

    const port = configService.get<number>('http.port');
    const origins = configService.get<string[]>('http.cors');
    const secure = configService.get<boolean>('http.secure');
    const keyPath = configService.get<string>('http.key');
    const certPath = configService.get<string>('http.cert');

    app.setGlobalPrefix('/api');

    app.enableCors({
        origin: origins,
        credentials: true,
    });

    app.use(
        helmet.contentSecurityPolicy({
            useDefaults: true,
            directives: {
                'img-src': [`'self'`, 'https: data:'],
            },
        })
    );

    app.use(cookieParser());
    app.useGlobalPipes(new YupValidationPipe());

    await app.init();

    if (secure) {
        try {
            const httpsOptions = {
                key: fs.readFileSync(keyPath),
                cert: fs.readFileSync(certPath),
            };

            https.createServer(httpsOptions, server).listen(port);

            logger.log(
                `🚀 The server was started in \x1b[36mHTTPS\x1b[32m mode on port \x1b[36m${port}`
            );
        } catch (e) {
            logger.error(`The HTTPS server cannot be started`);
            logger.error(e);
        }
    } else {
        http.createServer(server).listen(configService.get<number>('http.port'));

        logger.log(
            `🚀 The server was started in \x1b[35mHTTP\x1b[32m mode on port \x1b[36m${port}`
        );
    }
}

bootstrap();
