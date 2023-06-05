const models = require('../models')
const jwt = require('jsonwebtoken')
exports.io = (server) => {
    const io = require('socket.io')(server, {
        cors: process.env.ClientServer
    })


    io.use((socket, next) => {
        next()
    });

    io.on('connection', async (socket) => {
        console.log('client connected: ', socket.id, socket.handshake.address)

        let data = await models.Comments.findAll({
            attributes: ['id', 'user', 'content', 'parent', ['createdAt', 'time']],
            include: [
                {
                    model: models.Users,
                    attributes: ['id', 'nick', 'email', 'img']
                }
            ],
            where: {
                post: socket.handshake.query.post
            }
        })

        let comments = []

        data = JSON.parse(JSON.stringify(data))

        for (let i = 0; i < data.length; i++) {
            const c = data[i]
            if (!c.parent) {
                comments.push({
                    id: c.id,
                    user: c.User,
                    content: c.content,
                    time: c.time,
                    comments: []
                })
            } else {
                for (let j = 0; j < comments.length; j++) {
                    let c2 = comments[j]
                    if (c.parent === c2.id) {
                        comments[j]['comments'].push({
                            id: c.id,
                            user: c.User,
                            content: c.content,
                            time: c.time,
                        })
                    }
                }
            }
        }

        socket.emit('comment', comments)


        socket.on('send', async (Getdata) => {
            const { user_id, type } = jwt.verify(socket.handshake.auth.token, process.env.TOKEN_KEY)
            let parent = null
            if (!!Getdata.parent) {
                parent = Getdata.parent
            }
            await models.Comments.create({
                post: socket.handshake.query.post,
                user: user_id,
                content: Getdata.text,
                parent: parent
            })

            // chat.push({
            //     user: socket.id,
            //     text: text
            // })

            let data = await models.Comments.findAll({
                attributes: ['id', 'user', 'content', 'parent', ['createdAt', 'time']],
                include: [
                    {
                        model: models.Users,
                        attributes: ['id', 'nick', 'email', 'img']
                    }
                ],
                where: {
                    post: socket.handshake.query.post
                }
            })
            let comments = []
            data = JSON.parse(JSON.stringify(data))

            for (let i = 0; i < data.length; i++) {
                const c = data[i]
                if (!c.parent) {
                    comments.push({
                        id: c.id,
                        user: c.User,
                        content: c.content,
                        time: c.time,
                        comments: []
                    })
                } else {
                    for (let j = 0; j < comments.length; j++) {
                        let c2 = comments[j]
                        if (c.parent === c2.id) {
                            comments[j]['comments'].push({
                                id: c.id,
                                user: c.User,
                                content: c.content,
                                time: c.time,
                            })
                        }
                    }
                }
            }

            io.emit(`c${socket.handshake.query.post}`, comments)


        })


        socket.on('disconnect', (reason) => {
            console.log(reason, socket.id)
        })
    })
}
