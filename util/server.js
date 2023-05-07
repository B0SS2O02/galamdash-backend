const express = require('express')
const app = express()
require('dotenv').config()
const colors = require('colors')
app.use(express.json())
const cors = require('cors')
const models = require('../models')

const swaggerUi = require("swagger-ui-express")
const swaggerDoc = require("./swagger");
console.log(swaggerDoc)

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

const User = require('../routers/client/users.router.js')
const Category = require('../routers/client/category.router.js')
const Like = require('../routers/client/like.router.js')
const Posts = require('../routers/client/post.router.js')
const Unconfirmed = require('../routers/client/unconfirmed.router.js')
const Tag = require('../routers/client/tag.router.js')
const Comment = require('../routers/client/comment.router.js')
const View = require('../routers/client/view.router.js')

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use('/public', express.static('./public'))



// Admin routes
app.use('/admin/admin', Admin)
app.use('/admin/user', AdminUsers)
app.use('/admin/category', AdminCategory)
app.use('/admin/like', AdminLike)
app.use('/admin/post', AdminPost)
app.use('/admin/unconfirmed', AdminUnconfirmed)

// Client routes
app.use('/api/user', User)
app.use('/api/category', Category)
app.use('/api/like', Like)
app.use('/api/post', Posts)
app.use('/api/unconfirmed', Unconfirmed)
app.use('/api/tag', Tag)
app.use('/api/comment', Comment)
app.use('/api/view', View)

app.use((req, res) => {
    res.status(404).send('404')
})

const start = () => {
    models.sequelize.sync().then(() => {
        app.listen(process.env.PORT, () => { console.log(colors.yellow(`[Server]`) + ': ' + colors.green(`http://localhost:${process.env.PORT}`)) })
    })
}


start()