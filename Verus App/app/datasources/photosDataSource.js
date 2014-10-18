define([
], function () {

    return function (sort, filter) {

        var photoModel = {
            id: 'Id',
            fields: {
                createdAt: {
                    field: 'CreatedAt',
                    defaultValue: new Date()
                },
                photoFile: {
                    field: 'PhotoFile',
                    defaultValue: null
                },
                story: {
                    field: 'Story',
                    defaultValue: null
                },
                url: {
                    field: 'Url',
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
                model: photoModel
            },
            transport: {
                typeName: 'Photos'
            },
            serverSorting: true,
            serverFiltering: true,
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