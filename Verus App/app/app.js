define([
   'settings',
    'datasources/storiesDataSource',
    'datasources/photosDataSource'
], function (settings, StoriesDataSource, PhotosDataSource) {

    var loadUI = function () {
        return $.Deferred(function (dfd) {
            require([
               'views/tabStrip/tabStrip',
               'views/storyLink/storyLink'
            ], function () {
                dfd.resolve();
            });
        }).promise();
    };

    var app = {
        defaults: {},
        init: function () {
            var self = this;
            self.bes = new Everlive({
                apiKey: settings.everlive.apiKey,
                scheme: settings.everlive.scheme
            });

            $.when(loadUI()).then(function (nil) {

                self.instance = new kendo.mobile.Application(document.body, {
                    transition: 'slide',
                    skin: 'flat',
                    initial:'tabstrip-stories'
                });
            });
        },
        data: {
            stories: new StoriesDataSource(),
            photos: new PhotosDataSource()
        }
    };
    
    return app;
});