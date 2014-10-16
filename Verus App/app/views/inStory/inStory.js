define([
    'views/view',
    'text!views/inStory/inStory.html',
    'app'
], function (View, html, app) {
    
    var fetched = {};
    var fetchMaybe = function (type, cb) {
        if (!fetched[type]) {
            fetched[type] = true;
            app.data[type].fetch(cb);
        } else {
            cb();
        }
    };
    
    var model = kendo.observable({
        photos: app.data.photos,
        photoClick: function (e) {
            var story = e.data;
            
        }
    });

    var events = {
        init: function (e) {
            navbar = e.view.header.find('.km-navbar').data('kendoMobileNavBar');
        },
        show: function (e) {
            //this.loader.show();
        },
        afterShow: function (e) {
            var self = this;
            
        }
    };
    
    return new View('inStory', html, model, events);
});