exports.path = {
    '/api/greatwords': {
        get: {
            tags: ["GreatWords"],
            summary: 'Great words List',
            responses: {
                "200": {
                    description: 'OK'
                }
            }
        }
    }
}