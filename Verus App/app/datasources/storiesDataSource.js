define([
], function () {

    return function (sort, filter) {

        var storyModel = {
            id: 'Id',
            fields: {
                name: {
                    field: 'Name',
                    defaultValue: null
                },
                createdAt: {
                    field: 'CreatedAt',
                    defaultValue: new Date()
                },
                topImageUrl: {
                    field: 'TopImageUrl',
                    defaultValue: null
                },
                updatedPictureFile: {
                    field: 'UpdatedPictureFile',
                    defaultValue: null
                },
                userId: {
                    field: 'UserId',
                    defaultValue: null
                }
            }
        };

        var ds = new kendo.data.DataSource({
            type: 'everlive',
            schema: {
                model: storyModel
            },
            transport: {
                typeName: 'Stories'
            },
            serverSorting: true,
            sort: sort || {
                field: 'CreatedAt',
                dir: 'desc'
            },
            filter: filter || {},
            change: function (e) {
               
            }
        });

        return ds;
    }
});