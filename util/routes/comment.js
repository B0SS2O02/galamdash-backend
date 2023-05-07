exports.path = {
    '/api/comment/{id}': {
        get: {
            tags: ['Comment'],
            summary: 'Get comments of post',
            responses: {
                '200': {
                    'description': "OK"
                }
            },
        },
        parameters: [
            {
                in: 'path',
                name: 'id',
                required: true,
                description: 'Post ID',
                shema: {
                    type: 'integer'
                }
            }
        ]
    },
    '/api/comment': {
        post: {
            tags: ['Comment'],
            summary: 'Comment add',
            security: [{
                Auth: []
            }],
            responses: {
                '200': {
                    description: 'OK'
                }
            },
            requestBody: {
                require: true,
                content: {
                    "application/json": {
                        schema: {
                            "type": "object",
                            "required": ["post", "content"],
                            "properties": {
                                post: {
                                    type: 'integer',
                                    example: 4
                                },
                                content: {
                                    type: 'string',
                                    example: 'Comment'
                                },
                                parent: {
                                    type: 'integer',
                                    description:'Parent comment ID',
                                    example: 2
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}