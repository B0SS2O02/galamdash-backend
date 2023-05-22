exports.path = {
    '/api/draft': {
        get: {
            tags: ['Draft'],
            summary: 'User drafts',
            responses: {
                '200': {
                    description: 'OK'
                }
            },
            security: [{
                Auth: []
            }]
        },
        post: {
            tags: ["Draft"],
            summary: 'Create new draft',
            security: [{
                Auth: []
            }],
            responses: {
                "200": {
                    description: "OK",
                }
            },
            requestBody: {
                require: true,
                "content": {
                    "multipart/form-data": {
                        "schema": {
                            "type": "object",
                            "required": ["img", 'content', 'info', 'title', 'category'],
                            "properties": {
                                img: {
                                    type: "string",
                                    format: "binary"
                                },
                                content: {
                                    type: 'string',
                                    example: 'Content text'
                                },
                                info: {
                                    type: 'string',
                                    example: 'Info text'
                                },
                                title: {
                                    type: 'string',
                                    example: 'Post title'
                                }
                            }
                        }
                    }
                }

            }
        }
    },
    '/api/draft/{id}': {
        get: {
            tags: ['Draft'],
            summary: 'Get draft',
            responses: {
                "200": {
                    description: 'OK'
                }
            },
            security: [{
                Auth: []
            }],
        },
        put: {
            tags: ['Draft'],
            summary: 'Edit draft',
            responses: {
                '200': {
                    description: 'OK'
                }
            },
            requestBody: {
                require: true,
                "content": {
                    "multipart/form-data": {
                        "schema": {
                            "type": "object",
                            "required": ["img", 'content', 'info', 'title', 'category'],
                            "properties": {
                                img: {
                                    type: "string",
                                    format: "binary"
                                },
                                content: {
                                    type: 'string',
                                    example: 'Content text'
                                },
                                info: {
                                    type: 'string',
                                    example: 'Info text'
                                },
                                title: {
                                    type: 'string',
                                    example: 'Post title'
                                }
                            }
                        }
                    }
                }

            }
        },
        parameters: [
            {
                in: "path",
                name: 'id',
                description: 'Draft ID',
                required: true,
                schema: {
                    type: 'integer',
                }
            }
        ]
    },

}