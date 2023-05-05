exports.path = {
    "/api/post": {
        "get": {
            "tags": [
                "Post"
            ],
            "summary": "Get all Posts",
            "responses": {
                "200": {
                    "description": "ok",
                    content: {
                        "application/json": {
                            "schema": {
                                "$ref": "#/definitions/Posts"
                            }
                        }
                    }
                }
            },
            security: [{
                Auth: []
            }]



        },
        parameters: [
            {
                in: "query",
                name: 'page',
                description: 'Select page. Gives out 10 posts one page',
                schema: {
                    type: 'integer',
                }
            }, {
                in: 'query',
                name: 'userId',
                description: "If you want to get user posts",
                schema: {
                    type: 'integer'
                }
            }, {
                in: "query",
                name: 'my',
                description: "If you want to receive your posts.Need Token",
                schema: {
                    type: 'boolean',
                    enum: [
                        true,
                        false
                    ]
                }
            }, {
                in: 'query',
                name: "count",
                description: "Number of posts received. Default 10",
                schema: {
                    type: 'integer'
                }
            }
        ]

    },
    "/api/post/{id}": {
        "get": {
            "tags": [
                "Post"
            ],
            "summary": "Get post by id",
            security: [{
                Auth: []
            }],
            "responses": {
                "200": {
                    "description": "ok",
                    content: {
                        "application/json": {
                            "schema": {
                                "$ref": "#/definitions/Post"
                            }
                        }
                    }

                }
            },
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            "type": "object",
                            "required": ["email", "password"],
                            "properties": {
                                email: {
                                    type: 'string',
                                    example: 'example@mail.com'
                                },
                                password: {
                                    type: 'string',
                                    example: '12345678'
                                }
                            }
                        }
                    }
                }
            }
        },
        "parameters": [
            {
                "in": "path",
                "name": "id",
                "description": "ID of post",
                "required": true,
                "schema": {
                    "type": "integer"
                }
            }
        ]
    },
}

exports.models = {
    Posts: {
        type: 'array',
        items: {
            oneOf: [
                {
                    type: 'object',
                    properties: {
                        "id": {
                            type: 'integer',
                            example: 1
                        },
                        "title": {
                            type: 'string',
                            example: "Name"
                        },
                        "img": {
                            type: 'string',
                            example: "public/images/default_avatar.jpg"
                        }
                    },
                },
                {
                    type: 'object',
                    properties: {
                        "id": {
                            type: 'integer',
                            example: 1
                        },
                        "title": {
                            type: 'string',
                            example: "Name"
                        },
                        "img": {
                            type: 'string',
                            example: "public/images/default_avatar.jpg"
                        }
                    },
                },
                {
                    type: 'object',
                    properties: {
                        "id": {
                            type: 'integer',
                            example: 1
                        },
                        "title": {
                            type: 'string',
                            example: "Name"
                        },
                        "img": {
                            type: 'string',
                            example: "public/images/default_avatar.jpg"
                        }
                    },
                }

            ]
        }

    },

    "Post": {
        "properties": {
            "id": {
                type: 'integer',
                example: 1
            },
            "title": {
                type: 'string',
                example: "Name"
            },
            "content": {
                type: 'string',
                example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
            },
            "img": {
                type: 'string',
                example: "public/images/default_avatar.jpg"
            },
            "info": {
                type: 'string',
                example: 'Many information'
            },
            "time": {
                type: 'integer',
                format: "2023-04-25T13:22:44.275Z"
            },
            "Category": {
                type: 'object',
                properties: {
                    "id": {
                        type: 'integer',
                        example: 3
                    },
                    "title": {
                        type: 'string',
                        example: "Proza"
                    }
                }
            }
        }
    }
}