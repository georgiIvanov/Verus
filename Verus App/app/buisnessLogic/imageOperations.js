define([], function () {

    var io = {
        mimeMap: {
            jpg: "image/jpeg",
            jpeg: "image/jpeg",
            png: "image/png",
            gif: "image/gif"
        },
        createStory: function(imageData, title, cb){
            // create updating file
            // create story containing url for updating file
            // create photo with id to story and its own file
            // ???
            // success
            cb(true);
        }
    };

    return io;
});