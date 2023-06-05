exports.path = {
    '/api/reklama': {
        get: {
            tags: ['Reklama'],
            summary: "Reklama list",
            responses: {
                "200":{
                    description: "OK",
                }   
            }
        }
    }
}