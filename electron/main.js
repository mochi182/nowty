const { app, BrowserWindow } = require('electron');
const { exec } = require('child_process');
const waitOn = require('wait-on');

let appProcess;

async function startBackendAndFrontend() {
  appProcess = exec('npm run start-app');
}

function createWindow() {
  // Create the Electron window as needed
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.removeMenu();
  mainWindow.loadURL("http://localhost:3050");
  mainWindow.on("closed", function () {
    mainWindow = null;
  });

}

app.whenReady().then(async () => {
  await startBackendAndFrontend();

  try {
    createWindow();
  } catch (error) {
    console.error('Error waiting for servers to be ready:', error);
  }

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});
