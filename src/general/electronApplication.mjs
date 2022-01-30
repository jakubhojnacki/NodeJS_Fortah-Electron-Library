/**
 * @module "ElectronApplication" class
 * @description Represents electron application
 */

import Electron from "electron";

import { ApplicationBase } from "fortah-core-library";
import { MainWindow } from "../ui/mainWindow.mjs";

export class ElectronApplication extends ApplicationBase {
    constructor(pRootDirectoryPath, pArgTemplates, pSettings) {        
        super(pRootDirectoryPath, pArgTemplates, pSettings);
    }

    run() {
        super.run();
        const __this = this;
        Electron.app.on('ready', () => { __this.onElectronAppReady(); })
        Electron.app.on('activate', () => { __this.onElectronAppActivate(); });
        Electron.app.on('window-all-closed', () => { __this.onElectronAppWindowAllClosed(); });        
    }

    onElectronAppReady() {
        const mainWindow = new MainWindow(this);
        mainWindow.run();
    }

    onElectronAppActivate() {
        if (BrowserWindow.getAllWindows().length === 0)
            this.createMainWindow();
    }

    onElectronAppWindowAllClosed() {
        if (process.platform !== "darwin")
            Electron.app.quit();
    }
}
