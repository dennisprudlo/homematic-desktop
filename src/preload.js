const { contextBridge } = require('electron')
const Store = require('electron-store');
const ftp = require('basic-ftp');
const fs = require('fs');
const path = require('path');

const store = new Store();

contextBridge.exposeInMainWorld('ftp', {
    writeLocal: (filename, data, callback) => {
        const fullPath = path.join(path.dirname(store.path), filename);
        fs.writeFile(fullPath, data, callback)
    },
    upload: function (settings, fromFile, remotePath, listener) {
        const client = new ftp.Client();
        return client.access(settings)
            .then(accessResult => listener('accessed', accessResult))
            .then(() => {
                const fullPath = path.join(path.dirname(store.path), fromFile);
                return client.uploadFrom(fs.createReadStream(fullPath), remotePath)
            })
            .then(result => {
                listener('successful', result);
                client.close();
            })
            .catch(error => {
                listener('error', error);
                client.close();
            });
    }
});

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
