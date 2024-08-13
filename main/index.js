const { app, BrowserWindow, Tray, nativeImage, Menu, ipcMain, nativeTheme, globalShortcut, shell } = require('electron')
const path = require('node:path')

function createWindow() {
  const appIcon = nativeImage.createFromPath('./icons/win/icon.ico')
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '退出',
      role: 'quit' 
    },
  ])
  if (process.platform === 'win32') {
    const trayIcon = nativeImage.createFromPath('./icons/win/icon.ico')
    const tray = new Tray(trayIcon)
    tray.setContextMenu(contextMenu)
    tray.setTitle('SHTDaily')
    tray.setToolTip('你的日常助手')
  } else if (process.platform === 'darwin') {
    const trayIcon = nativeImage.createFromPath('./icons/mac/icon.icns')
    const tray = new Tray(trayIcon)
    tray.setContextMenu(contextMenu)
    tray.setTitle('SHTDaily')
    tray.setToolTip('你的日常助手')
  }
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    minWidth: 1000,
    minHeight: 700,
    frame: false,
    icon: appIcon,
    titleBarStyle: 'hidden',
    titleBarOverlay: {
        height: 35,
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
  if (process.platform === 'darwin') {
    app.dock.setIcon(path.join(__dirname, './icons/mac/icon.icns'))
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
  globalShortcut.register('Alt+CommandOrControl+Space', () => {
    if (win.isVisible()) {
      win.hide();
    } else {
      win.show();
    }
  })

  ipcMain.on("dark", () => {
    nativeTheme.themeSource = "dark"
    if (process.platform === 'win32') {
      win.setTitleBarOverlay({
        symbolColor: '#fff',
      })
    }
  })
  ipcMain.on("light", () => {
    nativeTheme.themeSource = "light"
    if (process.platform === 'win32') {
      win.setTitleBarOverlay({
        symbolColor: '#000',
      })
    }
  })
}