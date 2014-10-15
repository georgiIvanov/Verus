define([
    'views/view',
    'text!views/tabStrip/tabStrip.html',
    'app'
], function (View, html, app) {
    
    var tabSection = 'stories';

    var events = {
        init: function (e) {

        },
        show: function (e) {
            this.loader.show();
        },
        select: function (e) {
            tabSection = e.item.text().toLowerCase();
            console.log("Tabstrip item selected:" + tabSection);
        }
    };

    return new View('tabStrip', html, null, events)
});