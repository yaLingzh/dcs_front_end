import  electron from "electron";
// import url from "url";

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

const BrowserWindow = electron.BrowserWindow
//主进程
// const ipcMain = electron.ipcMain

const app = electron.app


let mainWindow
let presWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  // Open the DevTools.
 // if(process.env.NODE_ENV === 'development'){}
  BrowserWindow.addDevToolsExtension("C:/Users/Aimee/AppData/Local/Google/Chrome/User Data/Profile 2/Extensions/nhdogjmejiglipccpnnnanhbledajbpd/4.1.4_0")
  
  /**
   * Initial window options
   */

  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000,
    webPreferences: {
      // nodeIntegration: false,
      webSecurity: false, //支持跨域
    }
  })

  mainWindow.loadURL(winURL)
  // 打开窗口的调试工具
  mainWindow.webContents.openDevTools();
  //前期为了调试方面，默认打开控制台
  // mainWindow.webContents.openDevTools({ detach: true });

  mainWindow.on('closed', () => {
    mainWindow = null
  })

}



app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})


/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
