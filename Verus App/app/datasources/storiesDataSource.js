define([], function () {

    return function (sort, filter) {

        var storyModel = {
            id: 'Id',
            fields:{
                name: {
                    field: 'Name',
                    defaultValue: null
                },
                createdAt: {
                    field: 'CreatedAt',
                    defaultValue: new Date()
                },
                userId: {
                    field: 'UserId',
                    defaultValue: null
                }
            }
        };
        
        var ds = new kendo.data.DataSource({
            type:'everlive',
            schema: {
                model: storyModel  
            },
            transport:{
                typeName: 'Stories'
            },
            sort: sort || { field: 'Name', dir: 'desc' },
            filter: filter || {}
        });
        
        $.subscribe('/newStory/add', function (e, text) {
            var story = ds.add({
                name: text
            });
            ds.one('sync', function () {
                $.publish('/newStory/added', [cat]);
            });
            ds.sync();
        });
    }
});