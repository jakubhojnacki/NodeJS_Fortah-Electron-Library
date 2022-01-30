/**
 * @module "MainWindowRenderer" class
 * @description Represents renderer part of the main window
 */

import Electron from "electron";
import Path from "path";

const ApplicationInformation = require("../application/applicationInformation");
const HtmlToolkit = require("../userInterface/htmlToolkit");
const Settings = require("../settings/settings");
const Spinner = require('../userInterface/spinner');
const Splitter = require("../userInterface/splitter");

require("../general/javaScript");

export class MainWindowRenderer {
    get settings() { return this.mSettings; }
    set settings(pValue) { this.mSettings = pValue; }
    get notesContainer() { return this.mNotesContainer; }
    set notesContainer(pValue) { this.mNotesContainer = pValue; }

    constructor() {
        this.mSettings = null;
        this.mNotesContainer = null;        
    }

    run() {
        const spinner = new Spinner(mainContainer);
        const __this = this;
        Electron.ipcRenderer.on('getSettings', (lEvent, lArgs) => { __this.runWithSettings(lEvent, lArgs); });
        Electron.ipcRenderer.send('getSettings');
    }

    runWithSettings(pEvent, pArgs) {
        this.settings = Settings.deserialise(pArgs);
        const cssHref = `../css/${this.settings.window.darkMode ? "darkTheme.css" : "lightTheme.css"}`;
        const __this = this;
        HtmlToolkit.loadCssAsync(cssHref).then(() => { __this.runWithTheme(); });
    }

    runWithTheme() {
        this.updateApplicationInformation();
        this.loadMainWindow();
    }
    
    updateApplicationInformation() {
        const __this = this;
        Electron.ipcRenderer.on('getApplicationInformation', (lEvent, lArgs) => { __this.onGetApplicationInformation(lEvent, lArgs); });
        Electron.ipcRenderer.send('getApplicationInformation');
    }

    onGetApplicationInformation(pEvent, pArgs) {
        const applicationInformation = ApplicationInformation.deserialise(pArgs);
        document.title = applicationInformation.toString();
    }

    loadMainWindow() {
        console.info("[loadMainWindow]");
        mainContainer.innerHTML = HtmlToolkit.applyTemplate(Path.join(__dirname, "../../ejs/applicationWindow.ejs"));
        const splitter = new Splitter(desktopContainer, "notebookContainer", "notebookCategories", "notebookProperties", "30%");

        toolBarContainer.innerHTML = "ToolBar"; //TODO - Remove
        statusBarContainer.innerHTML = "StatusBar"; //TODO - Remove        
        notebookCategories.innerHTML = "Categories"; //TODO - Remove
        notebookProperties.innerHTML = "Properties"; //TODO - Remove
    }
}
