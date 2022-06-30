import path from 'path';
import { app, protocol, BrowserWindow, ipcMain } from 'electron';
import { environment } from './environments/environment';

protocol.registerSchemesAsPrivileged([
    {
        scheme: 'app',
        privileges: {
            standard: true,
            secure: false,
            allowServiceWorkers: true,
            supportFetchAPI: true,
        },
    },
]);

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'assets/preload.js'),
            nodeIntegration: true,
        },
    });

    if (environment.production) {
        mainWindow.loadURL('app://localhost/index.html');
    } else {
        mainWindow.loadURL('http://localhost:8080');
        mainWindow.webContents.openDevTools();
    }

    ipcMain.on('main', (event, args) => {
        mainWindow.webContents.send('renderer', { test: true });
    });
}

app.whenReady().then(() => {
    protocol.registerFileProtocol('app', (request, callback) => {
        const url = request.url.slice(16);
        callback({
            path: path.normalize(`${__dirname}/${url}`),
        });
    });

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
