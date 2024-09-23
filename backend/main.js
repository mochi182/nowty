const { app, BrowserWindow } = require('electron');
const { exec } = require('child_process');
const axios = require('axios');
const psTree = require('ps-tree');

// Configurar variables de entorno
var dotenv = require('dotenv');
dotenv_path = './env/.env';
dotenv.config({path: dotenv_path});

let backendProcess;

// Function to start the backend
async function startBackend() {
  backendProcess = exec('node app.js');
  
  // Optional: Attach listeners to log output or handle errors
  backendProcess.stdout.on('data', (data) => {
    console.log(`Backend: ${data}`);
  });
  backendProcess.stderr.on('data', (data) => {
    console.error(`Backend error: ${data}`);
  });
}

// Function to check if the backend server is running (on a specific URL)
async function isServerRunning(url) {
    try {
      const response = await axios.get(url, { timeout: 5000 }); // Timeout after 5 seconds
      return response.status === 200;
    } catch (error) {
      console.error(`Error connecting to ${url}:`, error.message);
      return false;
    }
  }

// Check if the backend server is running
var port = process.env.SERVER_PORT
const backendUrl = `http://localhost:${port}`;
async function checkBackend() {
  let backendReady = false;
  while (!backendReady) {
    backendReady = await isServerRunning(backendUrl);

    console.log('Backend ready:', backendReady);

    if (!backendReady) {
      console.log('Waiting for backend to start...');
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds before retrying
    }
  }

  console.log('Backend is running.');
}

function createWindow() {
  let mainWindow = new BrowserWindow({
    width: 1200,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.removeMenu();
  mainWindow.loadURL(backendUrl);
  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}

// Kill backend process when Electron is closed
async function stopBackend() {
    if (backendProcess) {
      const pid = backendProcess.pid;
      return new Promise((resolve, reject) => {
        psTree(pid, (err, children) => {
          if (err) return reject(err);
          
          // Kill each child process
          children.forEach(child => {
            process.kill(child.PID, 'SIGTERM'); // Use SIGTERM to request a graceful shutdown
          });
  
          // Now kill the parent process
          backendProcess.kill();
          console.log('Backend and child processes stopped.');
          resolve();
        });
      });
    }
  }

app.whenReady().then(async () => {
  // Start the backend
  await startBackend();

  try {
    // Wait until the backend is ready
    await checkBackend();
    createWindow();
  } catch (error) {
    console.error('Error waiting for backend to be ready:', error);
  }

  // Kill backend when Electron quits
  app.on('window-all-closed', async () => {
    await stopBackend(); // Stop the backend first
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

process.on('SIGINT', () => {
    console.log('SIGINT received, stopping servers...');
    stopBackend();
    process.exit();
  });
  
process.on('SIGTERM', () => {
    console.log('SIGTERM received, stopping servers...');
    stopBackend();
    process.exit();
});