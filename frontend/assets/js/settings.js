function saveSettings() {
    const newSettings = {}
    document.querySelectorAll('.setting').forEach(input => {
        const id = input.id;
        newSettings[id] = input.value
    });
    localStorage.setItem('settings', JSON.stringify(newSettings));
    if (newSettings && newSettings['data-bs-theme'] == 'dark') {
        document.querySelector('html').setAttribute('data-bs-theme', 'dark');
    } else {
        document.querySelector('html').setAttribute('data-bs-theme', 'light');
    }
}

function loadDeviceSettings() {
    let newSettings = {};
    try {
        newSettings = JSON.parse(localStorage.getItem('settings'));
    } catch (error) {
        console.log(error)
        alert(error)
    }
    Object.entries(newSettings).forEach(([key, value]) => {
        const element = document.getElementById(key)
        element.value = value;
    });
}
try {
    loadDeviceSettings();
} catch (e) {
    console.log(e);
}
Session.showAlert();
window.scrollTo(0, 0);