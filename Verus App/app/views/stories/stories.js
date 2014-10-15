define([
    'views/view',
    'text!views/stories/stories.html',
    'app'
], function (View, html, app) {
    
    return new View('stories', html, null, null);
});