define([
    'views/view',
    'text!views/stories/stories.html',
    'app',
    'views/inStory/inStory'
], function (View, html, app, inStory) {
    
    var self;
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
        enterStory: function (e) {
            var story = e.data;
            $.publish('/story/selected', [story]);
            app.instance.navigate('tabstrip-inStory?id=' + story.Id); 
        }
    });

    var events = {
        init: function (e) {
            self = this;
            navbar = e.view.header.find('.km-navbar').data('kendoMobileNavBar');
        },
        show: function (e) {
            this.loader.show();
        },
        afterShow: function (e) {            
            app.data["stories"].fetch(function () {
                self.loader.hide();
            });
        }
    };
    
    return new View('stories', html, model, events);
});