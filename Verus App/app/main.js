require.config({
    paths: {
        "text": "../lib/requirejs-text/text"
    }
});

define(['app'], function (app) {
    window.app = window.app || app;
    document.addEventListener('deviceready', function(){
        app.init();
        navigator.splashscreen.hide();
    }, false);
});