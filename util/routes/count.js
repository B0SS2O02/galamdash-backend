exports.path = {
    "/api/count/{id}": {
        "get": {
            "tags": [
                "Post"
            ],
            "summary": "Get post counts by id",

            "responses": {
                "200": {
                    "description": "ok",

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