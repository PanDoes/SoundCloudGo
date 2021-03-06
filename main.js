const electron = require('electron')
    // Module to control application life.
const {
    app,
    globalShortcut
} = require('electron')

// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
    // Create the browser window.
    //BrowserWindow.addDevToolsExtension('./ext/uBlock0.chromium');

    mainWindow = new BrowserWindow({
        width: 1097,
        height: 550,
        frame: false,
        title: "SoundCloudGo",
        menu: null,
        icon: __dirname + '/images/old.png',
        webPreferences: {
            plugins: true,
            webSecurity: false,
            allowDisplayingInsecureContent: true,
            experimentalFeatures: true
        }
    })

    // make thumbnail
    mainWindow.setThumbnailClip({ x: 0, y: mainWindow.getSize()[1] - 46, width: mainWindow.getSize()[0], height: 46 })

    //set progress
    //mainWindow.setProgressBar(0.5)

    // and load the index.html of the app.
    mainWindow.loadURL(`file://${__dirname}/index.html`)

    // Open the DevTools.
    mainWindow.webContents.openDevTools()

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })

    // emitted when the window is resized
    mainWindow.on("resize", function() {
        mainWindow.setThumbnailClip({ x: 0, y: mainWindow.getSize()[1] - 46, width: mainWindow.getSize()[0], height: 46 })
    })

}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function() {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.