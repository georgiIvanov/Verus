define([
    'app'
], function (app) {

    var self;
    var io = {
        init: function(){
            self = this;
        },
        mimeMap: {
            jpg: "image/jpeg",
            jpeg: "image/jpeg",
            png: "image/png",
            gif: "image/gif"
        },
        createStory: function (imageData, storyName, cb) {
            // create updating file
            // create story containing url for updating file
            // create photo with id to story and its own file
            // ???
            // success

            var stories = app.data.stories;

            var newStory = {
                name: storyName,
                topImageUrl: ""
            };

            stories.add(newStory);
            stories.one('sync', function () {
                $.publish('/newStory/added', [newStory]);
                self.uploadUpdatingFile(imageData, function(uploadedFile){
                    
                    var createdStory = stories.at(stories._total - 1);
                    createdStory.set('updatedPictureFile', uploadedFile.Id);
                    createdStory.set('topImageUrl', uploadedFile.Uri);
                    stories.sync();
                    cb(true);
                });
                 
            });
            stories.sync();

           
        },
        uploadUpdatingFile: function(data, cb){
            app.bes.Files.create({
                        Filename: Math.random().toString(36).substring(2, 15) + ".jpg",
                        ContentType: "image/jpeg",
                        base64: data
            }).then(function(data){
                cb(data.result);
            });
            
            
        }
    };
    io.init();
    
    return io;
});