const script = document.createElement('script');
script.type = 'importmap';
script.textContent = JSON.stringify({
    "imports": {
        "@js-joda/core": "./vendors/@js-joda/core/dist/js-joda.esm.js"
    }
});
document.currentScript.after(script);