import path from 'path';
import { app, protocol, BrowserWindow } from 'electron';
import { environment } from './environments/environment';
import { createProtocol } from './common/create-protocol';

protocol.registerSchemesAsPrivileged([
    {
        scheme: 'app',
        privileges: {
            secure: true,
            standard: true,
        },
    },
]);

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1024,
        height: 768,
        webPreferences: {
            preload: path.join(__dirname, 'assets/preload.js'),
            nodeIntegration: true,
        },
    });

    if (environment.production) {
        createProtocol('app');
        mainWindow.loadURL('app://localhost/index.html');
    } else {
        mainWindow.loadURL('http://localhost:8080');
        mainWindow.webContents.openDevTools();
    }
}

app.whenReady().then(() => {
    createWindow();
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
