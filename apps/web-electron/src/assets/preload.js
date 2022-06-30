const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld(
    'ipc',
    {
        send: (data) => {
            ipcRenderer.send('main', data);
        },
        receive: (func) => {
            ipcRenderer.on('renderer', (event, ...args) => func(...args));
        }
    }
);

contextBridge.exposeInMainWorld('isElectronApp', true);
