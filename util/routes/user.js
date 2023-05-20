exports.path = {
    "/api/user/login": {
        "post": {
            "tags": [
                "User"
            ],
            "summary": "Login",
            "responses": {
                "200": {
                    "description": "ok",
                    content: {
                        "application/json": {
                            "schema": {
                                "$ref": "#/definitions/Login"
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


    },
    "/api/user/registry": {
        "post": {
            "tags": [
                "User"
            ],
            "summary": "Registry",
            "responses": {
                "200": {
                    "description": "ok",
                    content: {
                        "application/json": {
                            "schema": {
                                "$ref": "#/definitions/Login"
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
                                password1: {
                                    type: 'string',
                                    example: '12345678'
                                },
                                password2: {
                                    type: 'string',
                                    example: '12345678'
                                },
                                name: {
                                    type: 'string',
                                    example: 'Username'
                                },
                                surname: {
                                    type: 'string',
                                    example: 'Surname'
                                },
                                nick: {
                                    type: 'string',
                                    example: 'Nick'
                                }
                            }
                        }
                    }
                }
            }
        },


    },
    "/api/user/own/{id}": {
        get: {
            tags: [
                "User"
            ],
            summary: "Get user information",
            responses: {
                "200": {
                    description: "OK",
                    content: {
                        "application/json": {
                            "schema": {
                                "$ref": "#/definitions/Cabinet1"
                            }
                        }
                    }
                }
            },
            "parameters": [
                {
                    "in": "path",
                    "name": "id",
                    "description": "User ID",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    }
                }
            ]
        }
    },
    "/api/user/my": {
        get: {
            tags: [
                "User"
            ],
            security: [{
                Auth: []
            }],
            summary: "Get user information",
            responses: {
                "200": {
                    description: "OK",
                    content: {
                        "application/json": {
                            "schema": {
                                "$ref": "#/definitions/Cabinet1"
                            }
                        }
                    }
                }
            }
        }
    },
    "/api/user/edit": {
        put: {
            tags: [
                "User"
            ],
            summary: "Edit user information",
            security: [{
                Auth: []
            }],
            responses: {
                "200": {
                    description: "OK",
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
                                nick: {
                                    type: 'string',
                                    example: 'Nick'
                                },
                                info: {
                                    type: 'string',
                                    example: 'User'
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

        }
    },
    "/api/user/image": {
        put: {
            tags: ["User"],
            summary: 'Change user image',
            security: [{
                Auth: []
            }],
            responses: {
                "200": {
                    description: "OK",
                    content: {
                        "application/json": {
                            "schema": {
                                "$ref": "#/definitions/Image"
                            }
                        }
                    }
                }
            },
            requestBody: {
                require: true,
                "content": {
                    "multipart/form-data": {
                        "schema": {
                            "type": "object",
                            "required": ["image"],
                            "properties": {
                                image: {
                                    type: "string",
                                    format: "binary"
                                }

                            }
                        }
                    }
                }

            }
        }
    }
}

exports.models = {
    Login: {
        properties: {
            "image": {
                type: "string",
                example: "public/images/default_avatar.jpg"
            },
            "nick": {
                type: "string",
                example: "Galamdash"
            },
            "type": {
                type: 'integer',
                example: 3
            },
            "token": {
                type: "string",
                example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ0eXBlIjozLCJpYXQiOjE2ODMxNDY0MDAsImV4cCI6MTY4MzIzMjgwMH0.P1pECLd9nelTCCkvrW83aqYonF8w5x5oV68-5xqOGo4"
            }

        }
    },
    Cabinet1: {
        properties: {
            "nick": { type: "string", example: "Galamdash" },
            "name": { type: 'string', example: 'Name' },
            "surname": { type: "string", example: 'Surname' },
            "img": { type: "string", example: "public/images/default_avatar.jpg" },
            "info": { type: 'string', example: "info" },
            "ball": { type: 'integer', example: 0 },
            "email": { type: "string", example: "example@mail.com" },
            "type": { type: "string", example: 'User' }
        }
    },
    Image: {
        properties: {
            img: { type: 'string', example: "public/images/default_avatar.jpg" }
        }
    }

}