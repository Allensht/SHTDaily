const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
    darkTheme: ifDarkTheme => {
        return ipcRenderer.send(ifDarkTheme)
    }
})