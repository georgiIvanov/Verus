define([
    'views/view',
    'text!views/tabStrip/tabStrip.html',
    'app',
    'views/stories/stories',
    'views/newStory/newStory',
    'views/settings/settings'
], function (View, html, app, stories, newStories, settings) {

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