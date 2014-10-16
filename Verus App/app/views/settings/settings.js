define([
    'views/view',
    'text!views/settings/settings.html',
    'app'
], function (View, html, app) {
    
    return new View('settings', html, null, null);
});