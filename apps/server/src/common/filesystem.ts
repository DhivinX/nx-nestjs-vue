import path from 'path';

interface NodeProcess extends NodeJS.Process {
    pkg?: {
        entrypoint: string;
        defaultEntrypoint: string;
    };
}

export function realDirname(): string {
    if ((process as NodeProcess).pkg) return process.cwd();
    return __dirname;
}

export function assetsDir(): string {
    return path.join(realDirname(), 'assets');
}

export function staticDir(): string {
    return path.join(realDirname(), 'static');
}
