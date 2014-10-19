define([
    'views/view',
    'text!views/storyLink/storyLink.html'
       ], function (View, html) {
    var model = kendo.observable({
        text: null,
        add: function (e) {
            modalView.close();
        },
        close: function (e) {
            modalView.close();
        }
    });

    var events = {
        init: function (e) {
            modalView = e.sender;
        },
        open: function () {
            //model.set("text", "");
        }
    };

    $.subscribe('/story/selected', function (e, story) {
        model.set("text", story.topImageUrl);
    });

    return new View('storyLink', html, model, events);
});