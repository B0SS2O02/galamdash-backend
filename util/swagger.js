const Post = require('./routes/post')
const User = require('./routes/user')
require('dotenv')

const imports = [Post, User]
let Path = {}
for (let i in imports) {
    let value = imports[i].path
    for (let p in value) {
        Path[p] = value[p]
    }
}


let Model = {}

for (let i in imports) {
    let value = imports[i].models
    for (let m in value) {
        Model[m] = value[m]
    }
}


module.exports = {
    openapi: '3.0.0',
    info: {
        version: "1.0.0",
        title: "Galamdash API",
        description: "Galamdash API map"
    },
    server: [
        {
            url: `${process.env.MyIP}:${process.env.PORT}`,
            description: "Server"
        }
    ],
    components: {
        securitySchemes: {
            Auth: {
                type: "apiKey",
                name: "Authorization",
                in: "header",
            }
        }
    },



    "paths": Path,
    "definitions": Model
}
