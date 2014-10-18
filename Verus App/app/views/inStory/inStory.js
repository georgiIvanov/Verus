define([
    'views/view',
    'text!views/inStory/inStory.html',
    'app'
], function (View, html, app) {

    var photos = null;
    var self = null;
    var shownStory = null;
    var fetched = {};
    var fetchMaybe = function (type, cb) {
        if (!fetched[type]) {
            fetched[type] = true;
            app.data[type].fetch(cb);
        } else {
            cb();
        }
    };
    
    var fetchFiltered = function(story){
            app.data.photos.filter({
                field: 'story',
                operator: 'eq',
                value: story.Id
            });
    }

    var model = kendo.observable({
        photos: app.data.photos,
        photoClick: function (e) {
            var photo = e.data;

        }
    });

    var events = {
        init: function (e) {
            navbar = e.view.header.find('.km-navbar').data('kendoMobileNavBar');
            self = this;
        },
        show: function (e) {
            navbar = e.view.header.find('.km-navbar').data('kendoMobileNavBar');
            fetchFiltered(shownStory);
        },
        afterShow: function (e) {

        }
    };

    $.subscribe('/story/selected', function (e, story) {
        shownStory = story;
    });

    return new View('inStory', html, model, events);
});