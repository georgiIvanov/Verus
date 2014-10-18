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

            var newStory = {
                name: storyName,
                topImageUrl: ""
            };

            stories.add(newStory);
            stories.one('sync', function () {
                $.publish('/newStory/added', [newStory]);
                self.uploadFile(imageData, function (uploadedFile) {

                    var createdStory = stories.at(stories._total - 1);
                    createdStory.set('updatedPictureFile', uploadedFile.Id);
                    createdStory.set('topImageUrl', uploadedFile.Uri);
                    self.createPhoto(imageData, createdStory.id);
                    stories.sync();
                    cb(true);
                });

            });
            stories.sync();
        },
        uploadFile: function (data, cb) {
            app.bes.Files.create({
                Filename: Math.random().toString(36).substring(2, 15) + ".jpg",
                ContentType: "image/jpeg",
                base64: data
            }).then(function (data) {
                cb(data.result);
            });
        },
        createPhoto: function (data, storyId) {
            self.uploadFile(data, function (uploadedFile) {
                var observablePhoto = new kendo.data.ObservableObject({
                    'Story': storyId,
                    'PhotoFile': uploadedFile.Id,
                    'Url': uploadedFile.Uri
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
            self.createPhoto(imageData, story.id);

            var file = {
                "FileName": Math.random().toString(36).substring(2, 15) + ".jpeg",
                "base64": imageData,
                "ContentType": 'image/jpeg',
            };


            app.bes.Files.updateContent(story.updatedPictureFile, file,
                function (data) {
                    //alert(JSON.stringify(data));
                },
                function (error) {
                    //alert(JSON.stringify(error));
                });
        }
    };
    io.init();

    return io;
});