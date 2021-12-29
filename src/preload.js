const { contextBridge } = require('electron')
const Store = require('electron-store');

const store = new Store();

contextBridge.exposeInMainWorld('store', {
    path: store.path,
    get: function(key) {
        return store.get(key);
    },
    set: function (key, value) {
        store.set(key, value);
    }
});

contextBridge.exposeInMainWorld('openURL', (url) => {
    require('electron').shell.openExternal(url);
})
