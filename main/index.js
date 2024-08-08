const { app, BrowserWindow, Tray, nativeImage, Menu, ipcMain, nativeTheme, globalShortcut, shell } = require('electron')
const path = require('node:path')

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
  tray.setToolTip('你的日常助手')
  tray.setTitle('SHTDaily')
  const win = new BrowserWindow({
    width: 950,
    height: 650,
    minWidth: 950,
    minHeight: 650,
    frame: false,
    icon: appIcon,
    titleBarStyle: 'hidden',
    titleBarOverlay: {
        height: 60,
        color: '#ffffff00',
        symbolColor: '#000'
    },
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      sandbox: false,
      preload: path.join(__dirname, '/preload.js')
    }
  });
  app.isPackaged ? win.loadFile('./dist/index.html') : win.loadURL('http://localhost:8000')
  win.once('ready-to-show', async () => {
    await windowOn(win)
  })
  if (app.isPackaged) {
    win.webContents.on('will-navigate', (e, url) => {
      e.preventDefault()
      shell.openExternal(url)
    })
    win.webContents.setWindowOpenHandler(({ url }) => {
      shell.openExternal(url)
      return { action: 'deny' }
    })
  }
}

app.whenReady().then(() => {
  createWindow()
})

app.on('will-quit', () => {
  globalShortcut.unregisterAll()
  app.setUserTasks([])
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

function windowOn(win) {
  globalShortcut.register('Alt+CommandOrControl+Shift+S', () => {
    if (win.isVisible()) {
      win.hide();
    } else {
      win.show();
    }
  })

  ipcMain.on("dark", () => {
    nativeTheme.themeSource = "dark"
    win.setTitleBarOverlay({
        symbolColor: '#fff',
    })
  })
  ipcMain.on("light", () => {
    nativeTheme.themeSource = "light"
    win.setTitleBarOverlay({
      symbolColor: '#000',
    })
  })
}