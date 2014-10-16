define([
    'views/view',
    'text!views/newStory/newStory.html',
    'app'
], function (View, html, app) {
    
    return new View('newStory', html, null, null);
});