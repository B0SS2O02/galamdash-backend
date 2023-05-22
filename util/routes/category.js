exports.path = {
    "/api/category": {
        "get": {
            "tags": [
                "Category"
            ],
            "summary": "Get list of Categories",
            "responses": {
                "200": {
                    "description": "ok",
                    content: {
                        "application/json": {
                            "schema": {
                                "$ref": "#/definitions/Categories"
                            }
                        }
                    }
                }
            },




        },
        parameters: [
            {
                in: "query",
                name: 'page',
                description: 'Select page. Gives out 10 category one page',
                schema: {
                    type: 'integer',
                }
            }, {
                in: 'query',
                name: "count",
                description: "Number of category received. Default 10",
                schema: {
                    type: 'integer'
                }
            }
        ]

    },
    "/api/category/{id}": {
        "get": {
            "tags": [
                "Category"
            ],
            "summary": "Get category by id",
            "responses": {
                "200": {
                    "description": "ok",
                    content: {
                        "application/json": {
                            "schema": {
                                "$ref": "#/definitions/Category"
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
                "description": "ID of category",
                "schema": {
                    "type": "integer"
                }
            }
        ]
    },
}

exports.models = {
    Categories: {
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
                            example: "Name1"
                        }
                    },
                },
                {
                    type: 'object',
                    properties: {
                        "id": {
                            type: 'integer',
                            example: 2
                        },
                        "title": {
                            type: 'string',
                            example: "Name2"
                        }
                    },
                },
                {
                    type: 'object',
                    properties: {
                        "id": {
                            type: 'integer',
                            example: 4
                        },
                        "title": {
                            type: 'string',
                            example: "Name3"
                        }
                    },
                }

            ]
        }

    },

    "Category": {
        type: "object",
        properties: {
            id: {
                type: 'integer',
                example: 3,
            },
            title: {
                type: 'string',
                example: "Proza"
            },
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
                                },
                                info: {
                                    type: 'string',
                                    example: "Post information"
                                }
                            }
                        }, {
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
                                },
                                info: {
                                    type: 'string',
                                    example: "Post information"
                                }
                            }
                        }, {
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
                                },
                                info: {
                                    type: 'string',
                                    example: "Post information"
                                }
                            }
                        }
                    ]
                }
            }
        }
    }

}