define([
    'views/view',
    'text!views/tabStrip/tabStrip.html',
    'app',
    'views/stories/stories'
], function (View, html, app, stories) {

    var tabSection = 'stories';
    
    var events = {
        init: function (e) {
            
        },
        show: function (e) {
            this.loader.show();
            
        },
        afterShow: function (e) { 
            
        },
        select: function (e) {
            tabSection = e.item.text().toLowerCase();
            console.log("Tabstrip item selected:" + tabSection);
        }
    };

    var result = new View('tabStrip', html, null, events);
    return result;
});