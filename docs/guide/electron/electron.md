# Electron

# 1、electron生命周期

- `will-finish-launching` 在应用完成基本启动进程之后触发。
- `ready` 当 electron 完成初始化后触发。
- `window-all-closed` 所有窗口都关闭的时候触发，在 windows 和 linux 里，所有窗口都退出的时候**通常**是应用退出的时候。
- `before-quit` 退出应用之前的时候触发。
- `will-quit` 即将退出应用的时候触发。
- `quit` 应用退出的时候触发。

# 2、进程通讯

### 1、渲染-主

使用 [`ipcRenderer.send`](https://electron.nodejs.cn/docs/latest/api/ipc-renderer) API 发送一条消息，然后由 [`ipcMain.on`](https://electron.nodejs.cn/docs/latest/api/ipc-main) API 接收该消息

preload是前后端沟通的桥梁

渲染进程 => preload => 主进程

流程

1. 定义main文件中，我们的主线程需要做什么，规定好preload中 传入的channel字段
2. 书写preload文件  ipcRenderer.send api 定义传入channel和参数
3. 渲染进程发送消息，通过事件 对挂载在window上的api进行调用

```js
main 主线程文件
function createWindow () {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })//引入preload
	//接收子组件传递信息
  ipcMain.on(channel, (event, args ) => {
    channel 字符串 从preload中传入的文本
    event ipc主事件，
    args 参数
  })
//读取html文件
  mainWindow.loadFile('index.html')
}
```

```js
//preload.js文件 
contextBridge.exposeInMainWorld('electronAPI', {
  setTitle: (payload) => ipcRenderer.send('set-title', payload)
})
//此时，你将能够在渲染器进程中使用 window.electronAPI.setTitle() 函数。
```

```js
//js文件调用
btn.addEventListener('click', () => {
  window.electronAPI.setTitle(payload)
})

```

### 2、双向

通过使用 [`ipcRenderer.invoke`](https://electron.nodejs.cn/docs/latest/api/ipc-renderer#ipcrendererinvokechannel-args) 与 [`ipcMain.handle`](https://electron.nodejs.cn/docs/latest/api/ipc-main#ipcmainhandlechannel-listener) 配对来完成

渲染进程=>preload=>ipcRender.invoke=>主线程=>ipcMain.handle返回值=>preload=>渲染进程返回

1. 主线程中，通过ipcMain.handle接收preload中invoke的消息，然后将此函数作为他的回调，返回值作为promise返回到原始的invoke调用
2. 通过repload加载ipcRender.invoke，该函数会在渲染进程进行调用
3. 渲染进程，执行preload的api，他抛出一个promise，这个值是我们在主线程返回的值

```javascript
//main.js (Main Process)
ipcMain.handle('channel', callback)
返回值是ipcRender的值
```

```js
//preload.js (Preload Script)
contextBridge.exposeInMainWorld('electronAPI', {
  api: () => ipcRenderer.invoke('dialog:openFile')
})
```

```js
//renderer.js 
btn.addEventListener('click', async () => {
  const filePath = await window.electronAPI.api()
})
```

### 3、主线程到渲染器

消息需要通过渲染器进程的 [`WebContents`](https://electron.nodejs.cn/docs/latest/api/web-contents) 实例发送到渲染器进程。此 WebContents 实例包含一个 [`send`](https://electron.nodejs.cn/docs/latest/api/web-contents#contentssendchannel-args) 方法，其使用方式与 `ipcRenderer.send` 相同。

```js
//main文件
//窗口创建后会有一个webContens的对象，发送
 mainWindow.webContents.send('channel', payload),
```

```js
//preload
//接收信息
contextBridge.exposeInMainWorld('electronAPI', {
  handler: (callback) => ipcRenderer.on('channel', (_event, value) => callback(value))
})
//接收一个回调，并且传入参数
```

```js
//rendere.js
window.electronAPI.handler(function)
```
