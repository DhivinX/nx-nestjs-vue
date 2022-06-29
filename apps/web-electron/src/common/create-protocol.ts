import { protocol } from 'electron';
import path from 'path';
import { readFile } from 'fs';
import { URL } from 'url';
import log from 'electron-log';

export function createProtocol(scheme: string) {
    protocol.registerBufferProtocol(scheme, (request, respond) => {
        let pathName: string = new URL(request.url).pathname;

        log.info(request.url);
        log.info(pathName);

        pathName = decodeURI(pathName);

        log.info(pathName);

        readFile(path.join(__dirname, pathName), (error, data) => {
            if (error) console.error(`Failed to read ${pathName} on ${scheme} protocol`, error);

            const extension: string = path.extname(pathName).toLowerCase();
            let mimeType = '';

            if (extension === '.js') {
                mimeType = 'text/javascript';
            } else if (extension === '.html') {
                mimeType = 'text/html';
            } else if (extension === '.css') {
                mimeType = 'text/css';
            } else if (extension === '.svg' || extension === '.svgz') {
                mimeType = 'image/svg+xml';
            } else if (extension === '.json') {
                mimeType = 'application/json';
            } else if (extension === '.wasm') {
                mimeType = 'application/wasm';
            }

            respond({ mimeType, data });
        });
    });
}
