var SETTINGS = {};
try {
    SETTINGS = JSON.parse(localStorage.getItem('settings'));
} catch (error) {
    console.log(error)
}

if (SETTINGS && SETTINGS['data-bs-theme'] == 'dark') {
    document.querySelector('html').setAttribute('data-bs-theme', 'dark');
}

document.body.innerHTML += window.API.fs.readFileSync("frontend/footer.html", "utf8");
