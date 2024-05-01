const Session = {

    setCookie: (cname, cvalue) => {
        const d = new Date();
        if (cvalue === '') d.setTime(d.getTime() - (360 * 24 * 60 * 60 * 1000));
        else d.setTime(d.getTime() + (14 * 60 * 60 * 1000));
        let expires = 'expires=' + d.toUTCString();
        document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/;SameSite=Strict;secure;';
    },
    getCookie: (cname) => {
        let name = cname + '=';
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return '';
    },
    get: (key) => {
        const val = localStorage.getItem(key) || '';
        if (!val) return null;
        try {
            return JSON.parse(val);
        } catch (e) {
            return null;
        }
    },
    set: (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    },
    push: (key, value) => {
        let item = localStorage.getItem(key);
        let obj = [];
        if (item) {
            obj = JSON.parse(item);
        }
        obj.push(value);
        localStorage.setItem(key, JSON.stringify(obj));
    },
    saveAlert: (value, type = 'danger') => {
        let item = localStorage.getItem('alerts');
        let obj = {};
        if (item) {
            obj = JSON.parse(item);
        }
        if (!obj[type]) obj[type] = [];
        obj[type].push(value);
        localStorage.setItem('alerts', JSON.stringify(obj));
    },
    countAlert: () => {
        const items = localStorage.getItem('alerts');
        if (!items) {
            return 0;
        }
        const obj = JSON.parse(items);
        return Object.keys(obj).length;
    },
    remove: (key) => {
        localStorage.removeItem(key);
    },
    removeAll: () => {
        localStorage.clear();
    },
    showAlert: (str = '', type = 'danger') => {
        let item = localStorage.getItem('alerts');
        localStorage.removeItem('alerts');
        let obj = {};
        if (item) {
            obj = JSON.parse(item);
        }
        if (str) {
            if (!obj[type]) obj[type] = [];
            obj[type].push(str);
        }
        Object.keys(obj).forEach(color => {
            if (obj[color].length > 0) {
                obj[color].forEach(element => {
                    console.log(color)
                    const toast = Toastify({
                        text: element,
                        duration: SETTINGS.notificationDuration ? +SETTINGS.notificationDuration * 1000 : 10000,
                        close: false,
                        className: 'bg-' + color + ' w3-round',
                        oldestFirst: true,
                        gravity: SETTINGS?.notificationPosition || "top", // `top` or `bottom`
                        position: SETTINGS?.notificationAlignment || "left", // `left`, `center` or `right`
                        stopOnFocus: true, // Prevents dismissing of toast on hover
                        stopOnWindowBlur: true, // Prevents dismissing of toast on window blur

                        style: {
                            background: "#444444",
                        },
                        onClick: function () { toast.hideToast(); } // Callback after click
                    })
                    toast.showToast();
                    if (!SETTINGS || !SETTINGS.notificationVolume) return;
                    if (+SETTINGS.notificationVolume > 0) {
                        const notificationSound = new Audio('./assets/audio/notification.mp3');
                        notificationSound.volume = +SETTINGS.notificationVolume;
                        notificationSound.play().catch(e => {
                            console.error("Audio playback failed", e);
                        });
                    }
                })
            }
        })



    },

};
