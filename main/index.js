const { app, BrowserWindow, Tray, nativeImage, Menu } = require('electron');

function createWindow() {
  const trayIcon = nativeImage.createFromPath('./icons/win/icon.ico')
  const appIcon = nativeImage.createFromPath('./icons/win/icon.ico')
  const tray = new Tray(trayIcon)
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '退出',
      role: 'quit' 
    },
  ])
  tray.setContextMenu(contextMenu)
  tray.setToolTip('SHTDaily')
  tray.setTitle('SHTDaily')
  const win = new BrowserWindow({
    width: 800,
    height: 500,
    minWidth: 800,
    minHeight: 500,
    frame: false,
    icon: appIcon,
    titleBarStyle: 'hidden',
    titleBarOverlay: {
        height: 48,
        color: '#ffffff00',
        symbolColor: '#000'
    },
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      sandbox: false
    }
  });
  app.isPackaged ? win.loadFile('./dist/index.html') : win.loadURL('http://localhost:8000')
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
  app.setUserTasks([])
});