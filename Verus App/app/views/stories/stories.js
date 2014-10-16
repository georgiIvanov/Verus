define([
    'views/view',
    'text!views/stories/stories.html',
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
        stories: app.data.stories,
        removeTodo: function (e) {
            this.stories.remove(e.data);
            this.stories.sync();
        }
    });

    var events = {
        init: function (e) {
            navbar = e.view.header.find('.km-navbar').data('kendoMobileNavBar');
        },
        show: function (e) {
            this.loader.show();
        },
        afterShow: function (e) {
            var self = this;
            fetchMaybe("stories", function () {
                self.loader.hide();
                    
            });
        }
    };
    
    return new View('stories', html, model, events);
});