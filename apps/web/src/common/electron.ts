declare global {
    interface Window {
        isElectronApp: boolean;
        ipc: {
            receive: (callback: (data: any) => void) => void;
            send: (data: any) => void;
        };
    }
}

export const isElectronProtocol = import.meta.url.includes('app://localhost');
