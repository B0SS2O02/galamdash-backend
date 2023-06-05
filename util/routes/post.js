exports.path = {
    "/api/post": {
        "get": {
            "tags": [
                "Post"
            ],
            "summary": "Get list of Posts",
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
    '/api/search': {
        get: {
            tags: ['Post'],
            summary: 'Posts search',
            "responses": {
                "200": {
                    "description": "ok",
                }
            }
        },
        parameters: [
            {
                in: 'query',
                name: 'word',
                required: true,
                description: 'Search title',
                schema: {
                    type: 'string'
                }
            }
        ]
    },
    "/api/random": {
        "get": {
            "tags": [
                "Post"
            ],
            "summary": "Get random list of Posts",
            "responses": {
                "200": {
                    "description": "ok",
                  
                }
            },



        },
       

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
            },
            "Tags": {
                type: 'array',
                items: {
                    oneOf: [{
                        type: 'object',
                        properties: {
                            "id": {
                                type: 'integer',
                                example: 2
                            }
                        }
                    }, {
                        type: 'object',
                        properties: {
                            "id": {
                                type: 'integer',
                                example: 4
                            }
                        }
                    }, {
                        type: 'object',
                        properties: {
                            "id": {
                                type: 'integer',
                                example: 6
                            }
                        }
                    }]
                }
            }
            ,
            "Like": {
                type: 'object',
                properties: {
                    "id": {
                        type: 'integer',
                        example: 1
                    },
                    "type": {
                        type: 'string',
                        example: "like"
                    }
                }

            }
        }
    }

}