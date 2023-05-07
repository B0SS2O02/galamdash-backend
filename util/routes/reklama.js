exports.path = {
    '/api/reklama/{position}': {
        get: {
            tags: ['Reklama'],
            summary: "Reklama list",
            responses: {
                "200":{
                    description: "OK",
                }   
            }
        },
        parameters: [
            {
                in: 'path',
                name: 'position',
                description: "Reklama position",
                shema: {
                    type: 'integer'
                }

            }
        ]
    }
}