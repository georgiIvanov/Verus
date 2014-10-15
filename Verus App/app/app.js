define([
   'settings',
    'datasources/storiesDataSource'
], function (settings, StoriesDataSource) {

    var loadUI = function () {
        return $.Deferred(function (dfd) {
            require([
               'views/tabStrip/tabStrip'
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
                    initialView: 'tabStrip'
                });
            });
        },
        data: {
            stories: new StoriesDataSource()
        }
    };
    
    return app;
});