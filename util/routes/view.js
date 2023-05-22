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
    }
}