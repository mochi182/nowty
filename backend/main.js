const { app, BrowserWindow } = require('electron');
const { exec } = require('child_process');
const axios = require('axios');

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
async function checkBackend() {
  const backendUrl = "http://localhost:3000";

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
  mainWindow.loadURL("http://localhost:3000"); // Backend serves the frontend here
  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}

// Kill backend process when Electron is closed
function stopBackend() {
  if (backendProcess) {
    backendProcess.kill();
    console.log('Backend stopped.');
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
  app.on('window-all-closed', () => {
    stopBackend(); // Stop the backend first
    if (process.platform !== 'darwin') {
      app.quit();
      process.exit();
    }
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Capture termination signals to close the backend if the script is manually stopped
process.on('SIGINT', () => {
    console.log('SIGINT received, stopping backend...');
    stopBackend();
    process.exit();
  });

process.on('SIGTERM', () => {
    console.log('SIGTERM received, stopping backend...');
    stopBackend();
    process.exit();
});
