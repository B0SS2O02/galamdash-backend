exports.path = {
    "/api/unconfirmed": {
        post: {
            tags: ["Post"],
            summary: 'Create new post',
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
                            "required": ["img",'content','info','title','category'],
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
                                },
                                category: {
                                    type: 'integer',
                                    example: 3
                                }
                            }
                        }
                    }
                }

            }
        }
    }
}

