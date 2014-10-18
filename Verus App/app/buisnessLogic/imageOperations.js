define([
    'app'
], function (app) {

    var self;
    var io = {
        init: function () {
            self = this;
        },
        mimeMap: {
            jpg: "image/jpeg",
            jpeg: "image/jpeg",
            png: "image/png",
            gif: "image/gif"
        },
        createStory: function (imageData, storyName, cb) {

            var stories = app.data.stories;
            var fileName = self.createFileName();
            var newStory = {
                name: storyName,
                topImageUrl: "",
                updatedPicture: fileName
            };

            self.uploadFile(imageData, fileName, function (success) {
                newStory.topImageUrl = self.urlWithFileName(fileName);
                stories.add(newStory);
                stories.one('sync', function () {
                    var createdStory = stories.at(stories._total - 1);
                    self.createPhoto(imageData, createdStory.id);
                    stories.sync();
                    cb(true);

                });
                stories.sync();
            });

        },
        uploadFile: function (data, fileName, cb) {

            $.ajax({
                type: 'POST',
                url: 'http://91.148.170.36/kusaAPI2/',
                data: {
                    'Filename': fileName,
                    'base64': data
                },
                success: function (msg) {
                    console.log(msg);
                    cb(true);
                }
            });
        },
        createPhoto: function (data, storyId) {
            var fileName = self.createFileName();
            self.uploadFile(data, fileName, function (uploadedFile) {
                var observablePhoto = new kendo.data.ObservableObject({
                    'Story': storyId,
                    'Url': self.urlWithFileName(fileName)
                });
                var photos = app.bes.data('Photos');
                photos.create(observablePhoto,
                    function (data) {
                        //alert(JSON.stringify(data));
                    },
                    function (error) {
                        alert(JSON.stringify(error));
                    });
            });
        },
        addPhotoToStory: function (imageData, story, cb) {
            var fileName = self.createFileName();
            self.createPhoto(imageData, story.id);
            self.uploadFile(imageData, story.updatedPicture, function(){
                
            });

            

        },
        urlWithFileName: function (fileName) {
            var url = 'http://91.148.170.36/kusaAPI2/files/' + fileName;
            return url;
        },
        createFileName: function(){
            return Math.random().toString(36).substring(2, 15) + ".jpg";
        }
    };
    io.init();

    return io;
});