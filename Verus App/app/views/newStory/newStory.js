define([
    'views/view',
    'text!views/newStory/newStory.html',
    'app',
    'buisnessLogic/imageOperations'
], function (View, html, app, imageOperations) {
    
    var tookPicture = false;
    
    var events = {
        init: function (e) {

        },
        afterShow: function (e) {
            var self = this;


        }
    };

    var model = kendo.observable({
        addImage: function (e) {
            if(tookPicture == true)
            {
                return;
            }
            var story = e.data;

            var success = function (data) {
                var imageElement = '<img src="data:image/jpg;charset=utf-8;base64,' + data + 
                    '" class="photo-image"/>';
                var tab = $('#newStoryPicture');
                tab.append(imageElement);
                tookPicture = true;
            };

            var error = function () {
                navigator.notification.alert("Unfortunately we could not add the image");
            };

            var config = {
                destinationType: Camera.DestinationType.DATA_URL
            }

            navigator.camera.getPicture(success, error, config)
        }
    });

    return new View('newStory', html, model, events);
});