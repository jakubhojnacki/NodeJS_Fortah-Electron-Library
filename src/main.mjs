/**
 * @module "Main" module
 * @description 
 */

"use strict";

import { ElectronApplication as iElectronApplication } from "./general/electronApplication.mjs";
export const ElectronApplication = iElectronApplication;

import { MainWindow as iMainWindow } from "./ui/mainWindow.mjs";
export const MainWindow = iMainWindow;
import { MainWindowRenderer as iMainWindowRenderer } from "./ui/mainWindowRenderer.mjs";
export const MainWindowRenderer = iMainWindowRenderer;