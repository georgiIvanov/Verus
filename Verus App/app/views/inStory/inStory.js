define([
    'views/view',
    'text!views/inStory/inStory.html',
    'app',
    'buisnessLogic/imageOperations'
], function (View, html, app, imageOperations) {

    var photos = null;
    var self = null;
    var shownStory = null;

    var fetchFiltered = function (story) {
        app.data.photos.filter({
            field: 'story',
            operator: 'eq',
            value: story.Id
        });
    }

    var model = kendo.observable({
        photos: app.data.photos,
        addPhoto: function (e) {
            var success = function (data) {
                imageOperations.addPhotoToStory(data, shownStory, function (success) {
                    
                });
            };

            var error = function () {
                navigator.notification.alert("Unfortunately we could not add the image");
            };

            var config = {
                destinationType: Camera.DestinationType.DATA_URL
            }

            navigator.camera.getPicture(success, error, config);

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