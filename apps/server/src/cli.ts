import { INestApplicationContext } from '@nestjs/common';
import { BootstrapConsole } from 'nestjs-console';
import { AppModule } from './app/app.module';

async function bootstrap() {
    const cli = new BootstrapConsole({
        module: AppModule,
        useDecorators: true,
    });

    const app: INestApplicationContext = await cli.init();

    try {
        await app.init();
        await cli.boot();
        process.exit(0);
    } catch (e) {
        process.exit(1);
    }
}

bootstrap();
