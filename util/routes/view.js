exports.path = {
    '/api/view': {
        'get': {
            tags: ['View'],
            summary: 'List of user views',
            security: [{
                Auth: []
            }],
            responses: {
                '200': {
                    description: "OK"
                }
            }
        }
    },
    '/api/view/{id}': {
        get: {
            tags: [
                'Post'
            ],
            summary: 'Get views count of post',
            responses: {
                "200": {
                    description: 'OK'
                }
            }
        },
        parameters: [
            {
                in: 'path',
                name: "id",
                description: 'Post ID',
                required: true,
                schema: {
                    type: 'integer'
                }
            }
        ]
    }
}