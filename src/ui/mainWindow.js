/**
 * @module "MainWindow" class
 * @description Handles main window in main process
 */

import Electron from "electron";

export class MainWindow {
    get application() { return this.mApplication; }
    set application(pValue) { this.mApplication = pValue; }
    get window() { return this.mWindow; }
    set window(pValue) { this.mWindow = pValue; }

    constructor(pApplication) {
        this.application = pApplication;
        this.window = null;
    }

    run() {
        this.createWindow();
        this.initialiseEventHandlers();
    }

    createWindow() {
        this.window = new Electron.BrowserWindow({ 
            width: this.application.settings.window.width, 
            height: this.application.settings.window.height, 
            webPreferences: { nodeIntegration: true } 
        });
        this.window.loadURL(`file://${__dirname}/../../html/applicationWindow.html`);
        if (this.application.settings.diagnostics.debugMode)
            this.window.webContents.openDevTools();
        const __this = this;
        this.window.on('closed', () => { __this.onWindowClosed(); });
    }

    onWindowClosed() {
        this.window = null;
    }
    
    initialiseEventHandlers() {
        const __this = this;
        electron.ipcMain.on('getApplicationInformation', (pEvent, pArgs) => { __this.onGetApplicationInformation(pEvent, pArgs); })        
        electron.ipcMain.on('getSettings', (pEvent, pArgs) => { __this.onGetSettings(pEvent, pArgs); })        
    }

    onGetApplicationInformation(pEvent, pArgs) {
        const applicationInformation = this.application.information;
        const data = applicationInformation.serialise();
        pEvent.sender.send('getApplicationInformation', data);
    }

    onGetSettings(pEvent, pArgs) {
        const data = this.application.settings.serialise();
        pEvent.sender.send('getSettings', data);
    }
}

module.exports = ApplicationWindowMain;