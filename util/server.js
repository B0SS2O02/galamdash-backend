const express = require('express')
const app = express()
require('dotenv').config()
const colors = require('colors')
app.use(express.json())
const cors = require('cors')
const models = require('../models')

const swaggerUi = require("swagger-ui-express")
const swaggerDoc = require("./swagger");



const server = require('http').createServer(app)

const socket = require('./socket.io.js')

socket.io(server)

// Cors
const corsOptions = {
    origin: process.env.ClientServer,
}
app.use(cors(corsOptions))

// Routes



// Socket(io)


const adminRouters = require('../routers/admin')

const clientRoutes = require('../routers/client')



app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use('/public', express.static('./public'))

// app.use((req, res, next) => {
//     console.log({
//         time: Date(new Date()),
//         ip: req.ip,
//         header: req.headers,
//         method: req.method,
//         path: req.path,
//         body: req.body,
//         query: req.query,
//         params: req.params,
//     })
//     next()
// })

// Admin routes
app.use('/admin/admin', adminRouters.Admin)
app.use('/admin/user', adminRouters.AdminUsers)
app.use('/admin/category', adminRouters.AdminCategory)
app.use('/admin/like', adminRouters.AdminLike)
app.use('/admin/post', adminRouters.AdminPost)
app.use('/admin/unconfirmed', adminRouters.AdminUnconfirmed)
app.use('/admin/reklama', adminRouters.AdminReklama)
app.use('/admin/greatwords', adminRouters.AdminGreatWords)
app.use('/admin/tag', adminRouters.AdminTags)

// Client routes

app.use('/api/user', clientRoutes.User)
app.use('/api/category', clientRoutes.Category)
app.use('/api/like', clientRoutes.Like)
app.use('/api/post', clientRoutes.Posts)
app.use('/api/unconfirmed', clientRoutes.Unconfirmed)
app.use('/api/tag', clientRoutes.Tag)
app.use('/api/comment', clientRoutes.Comment)
app.use('/api/view', clientRoutes.View)
app.use('/api/draft', clientRoutes.Draft)
app.use('/api/greatwords', clientRoutes.GreatWords)
app.use('/api/reklama', clientRoutes.Reklama)
app.use('/api/search', clientRoutes.Search)
app.use('/api/random', clientRoutes.Random)
app.use('/api/count', clientRoutes.Count)

app.use((req, res, next) => {
    console.log({
        time: Date(new Date()),
        ip: req.ip,
        header: req.headers,
        method: req.method,
        path: req.path,
        body: req.body,
        query: req.query,
        params: req.params,
    })
})



app.use((req, res, next) => {
    console.log('404')
    res.status(404).send('404')
    next()
})


models.sequelize.sync().then(() => {
    server.listen(process.env.PORT, () => {
        console.log(colors.yellow(`[Server]`) + ': ' + colors.green(`http://localhost:${process.env.PORT}`))
    })
})



