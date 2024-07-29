const { app, BrowserWindow, Tray, nativeImage, Menu } = require('electron');
const path = require('node:path')

function createWindow() {
  const trayIcon = nativeImage.createFromPath('./src/assets/icons/win/logo.ico')
  const appIcon = nativeImage.createFromPath('./src/assets/icons/win/logo.ico')
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
  app.setUserTasks([
    {
      program: process.execPath,
      arguments: '--new-window',
      iconPath: process.execPath,
      iconIndex: 0,
      title: 'New Window',
      description: 'Create a new window'
    }
  ])
  const win = new BrowserWindow({
    width: 980,
    height: 685,
    minWidth: 770,
    minHeight: 530,
    frame: false,
    icon: appIcon,
    titleBarStyle: 'hidden',
    titleBarOverlay: {
        height: 60,
        color: '#ffffff00',
        symbolColor: '#000'
    },
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
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

console.log(app.isPackaged)
