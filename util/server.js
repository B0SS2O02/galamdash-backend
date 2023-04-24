const express = require('express')
const app = express()
require('dotenv').config()
const colors = require('colors')
app.use(express.json())
const cors = require('cors')
const models = require('../models')

// Cors
const corsOptions = {
    origin: '*',
}
app.use(cors(corsOptions))

// Routes
const Admin = require('../routers/admin/admin.router.js')
const AdminUsers = require('../routers/admin/users.router.js')
const User = require('../routers/client/users.router.js')
const AdminCategory = require('../routers/admin/category.router.js')
const Category = require('../routers/client/category.router.js')
const Like = require('../routers/client/like.router.js')
const AdminLike = require('../routers/admin/like.router.js')
const Posts = require('../routers/client/post.router.js')
const AdminPost = require('../routers/admin/post.router.js')

app.use('/public', express.static('./public'))

// Admin routes
app.use('/admin/admin', Admin)
app.use('/admin/user', AdminUsers)
app.use('/admin/category', AdminCategory)
app.use('/admin/like', AdminLike)
app.use('/admin/post', AdminPost)

// Client routes
app.use('/user', User)
app.use('/category', Category)
app.use('/like', Like)
app.use('/post', Posts)

app.use((req, res) => {
    res.status(404).send('404')
})

const start = () => {
    models.sequelize.sync().then(() => {
        app.listen(process.env.PORT, () => { console.log(colors.yellow(`[Server]`) + ': ' + colors.green(`http://localhost:${process.env.PORT}`)) })
    })

}


start()