const { app, Menu, BrowserWindow, shell, ipcMain } = require('electron');
const path = require('path');



const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 1280,
        height: 800,
        minWidth: 1024,
        minHeight: 760,
        fullscreenable: false,
        resizable: true,
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: true,
            enableRemoteModule: true,
            devTools: true,
        }
    })

    mainWindow.loadFile("./frontend/index.html")

    // show dev console upon launch
    // mainWindow.webContents.openDevTools();


}

app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
    if (mainWindow === null) createWindow();
});