define([
    'views/view',
    'text!views/newStory/newStory.html',
    'app',
    'buisnessLogic/imageOperations'
], function (View, html, app, imageOperations) {

    var imageData = null;
    var self = null;

    var events = {
        init: function (e) {
            self = this;
            //$('#newStoryTitle').val("test story");
        },
        afterShow: function (e) {

        }
    };

    var model = kendo.observable({
        addImage: function (e) {
            
            var success = function (data) {
                var imageElement = '<img src="data:image/jpg;charset=utf-8;base64,' + data +
                    '" class="photo-image" id="newStoryPicture"/>';
                $('#newStoryPicture').replaceWith(imageElement);
                imageData = data;
            };

            var error = function () {
                navigator.notification.alert("Unfortunately we could not add the image");
            };

            var config = {
                destinationType: Camera.DestinationType.DATA_URL
            }

            navigator.camera.getPicture(success, error, config);
        },
        createButtonTap: function (e) {
            var storyTitle = $('#newStoryTitle').val();
            if(storyTitle != "" && imageData){
                self.loader.show();
                imageOperations.createStory(imageData, storyTitle, function(success){
                    self.loader.hide();
                    $('#newStoryPicture').replaceWith('<img src="" class="photo-image" id="newStoryPicture"/>');
                    $('#newStoryTitle').val("");
                    imageData = null;
                });
            }
        }
    });

    return new View('newStory', html, model, events);
});