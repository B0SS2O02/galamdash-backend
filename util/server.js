const express = require('express')
const app = express()
require('dotenv').config()
const colors = require('colors')
app.use(express.json())
const cors = require('cors')
const models = require('../models')

const swaggerUi = require("swagger-ui-express")
const swaggerDoc = require("./swagger");

// Cors
const corsOptions = {
    origin: '*',
}
app.use(cors(corsOptions))

// Routes
const Admin = require('../routers/admin/admin.router.js')
const AdminUsers = require('../routers/admin/users.router.js')
const AdminCategory = require('../routers/admin/category.router.js')
const AdminLike = require('../routers/admin/like.router.js')
const AdminPost = require('../routers/admin/post.router.js')
const AdminUnconfirmed = require('../routers/admin/unconfirmed.router.js')
const AdminReklama = require('../routers/admin/reklama.router.js')
const AdminGreatWords = require('../routers/admin/greatwords.router.js')
const AdminTags = require('../routers/admin/tags.router.js')

const User = require('../routers/client/users.router.js')
const Category = require('../routers/client/category.router.js')
const Like = require('../routers/client/like.router.js')
const Posts = require('../routers/client/post.router.js')
const Unconfirmed = require('../routers/client/unconfirmed.router.js')
const Tag = require('../routers/client/tag.router.js')
const Comment = require('../routers/client/comment.router.js')
const View = require('../routers/client/view.router.js')
const Draft = require('../routers/client/draft.router.js')
const GreatWords = require('../routers/client/greatwords.router.js')
const Reklama = require('../routers/client/reklama.router.js')
const Search = require('../routers/client/search.router.js')
<<<<<<< HEAD
=======
const Count = require('../routers/client/counts.router')

>>>>>>> master

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use('/public', express.static('./public'))

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
    next()
})

// Admin routes
app.use('/admin/admin', Admin)
app.use('/admin/user', AdminUsers)
app.use('/admin/category', AdminCategory)
app.use('/admin/like', AdminLike)
app.use('/admin/post', AdminPost)
app.use('/admin/unconfirmed', AdminUnconfirmed)
app.use('/admin/reklama', AdminReklama)
app.use('/admin/greatwords', AdminGreatWords)
app.use('/admin/tag', AdminTags)

// Client routes

app.use('/api/user', User)
app.use('/api/category', Category)
app.use('/api/like', Like)
app.use('/api/post', Posts)
app.use('/api/unconfirmed', Unconfirmed)
app.use('/api/tag', Tag)
app.use('/api/comment', Comment)
app.use('/api/view', View)
app.use('/api/draft', Draft)
app.use('/api/greatwords', GreatWords)
app.use('/api/reklama', Reklama)
app.use('/api/search', Search)
<<<<<<< HEAD

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
=======
app.use('/api/count', Count)

app.use((req, res, next) => {
    console.log('404')
>>>>>>> master
    res.status(404).send('404')
    next()
})

const start = () => {
    models.sequelize.sync().then(() => {
        app.listen(process.env.PORT, () => { console.log(colors.yellow(`[Server]`) + ': ' + colors.green(`http://localhost:${process.env.PORT}`)) })
    })
}


start()