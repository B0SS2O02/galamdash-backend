exports.path = {
    '/api/like/': {
        post: {
            'tags': ['Like'],
            summary: 'Add like or dislike',
            responses: {
                "200": {
                    description: 'OK'
                }
            },
            security: [{
                Auth: []
            }],
            requestBody: {
                required: true,
                description: 'post - Post ID |type - [like,dislike]',
                content: {
                    "application/json": {
                        schema: {
                            "type": "object",
                            "required": ["type", "post"],
                            "properties": {
                                type: {
                                    type: 'string',
                                    enum: ['like', "dislike"]
                                },
                                post: {
                                    type: 'integer',
                                    example: 2
                                }
                            }
                        }
                    }
                }
            }
        },
        delete: {
            'tags': ['Like'],
            summary: 'Delete like or dislike',
            responses: {
                "200": {
                    description: 'OK'
                }
            },
            security: [{
                Auth: []
            }],
            requestBody: {
                required: true,
                description: 'post - Post ID ',
                content: {
                    "application/json": {
                        schema: {
                            "type": "object",
                            "required": ["type", "post"],
                            "properties": {
                                post: {
                                    type: 'integer',
                                    example: 2
                                }
                            }
                        }
                    }
                }
            }

        }

    },


}