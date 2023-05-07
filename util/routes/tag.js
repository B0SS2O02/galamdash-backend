exports.path = {
    "/api/tag": {
        "get": {
            "tags": [
                "Tag"
            ],
            "summary": "Get list of tags",
            "responses": {
                "200": {
                    "description": "ok",
                    content: {
                        "application/json": {
                            "schema": {
                                "$ref": "#/definitions/Tags"
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
                description: 'Select page. Gives out 10 tags one page',
                schema: {
                    type: 'integer',
                }
            }, {
                in: 'query',
                name: "count",
                description: "Number of tags received. Default 10",
                schema: {
                    type: 'integer'
                }
            }
        ]

    },
    "/api/tag/{id}": {
        "get": {
            "tags": [
                "Tag"
            ],
            "summary": "Get post by tag",
            "responses": {
                "200": {
                    "description": "ok",
                    content: {
                        "application/json": {
                            "schema": {
                                "$ref": "#/definitions/Tag"
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
                "description": "ID of tag",
                "required": true,
                "schema": {
                    "type": "integer"
                }
            }, {
                in: "query",
                name: 'page',
                description: 'Select page. Gives out 10 posts one page',
                schema: {
                    type: 'integer',
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
}

exports.models = {
    Tags: {
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
                            example: "Tag1"
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
                            example: "Tag2"
                        }
                    },
                },
                {
                    type: 'object',
                    properties: {
                        "id": {
                            type: 'integer',
                            example: 3
                        },
                        "title": {
                            type: 'string',
                            example: "Tag3"
                        }
                    },
                }

            ]
        }

    },
    Tag: {
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
                        Post: {
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
                                "info": {
                                    type: 'string',
                                    example: 'Info'
                                },
                            }
                        }
                    },
                }, {
                    type: 'object',
                    properties: {
                        "id": {
                            type: 'integer',
                            example: 1
                        },
                        Post: {
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
                                "info": {
                                    type: 'string',
                                    example: 'Info'
                                },
                            }
                        }
                    },
                }, {
                    type: 'object',
                    properties: {
                        "id": {
                            type: 'integer',
                            example: 1
                        },
                        Post: {
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
                                "info": {
                                    type: 'string',
                                    example: 'Info'
                                },
                            }
                        }
                    },
                },


            ]
        }

    },


}