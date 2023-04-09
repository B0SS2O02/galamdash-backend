const express = require('express')
const app = express()
require('dotenv').config()
const colors = require('colors')
app.use(express.json())

// Routes
const AdminUsers = require('../routers/admin/users.router.js')
const User = require('../routers/client/users.router.js')
const AdminCategory = require('../routers/admin/category.router.js')
const Category = require('../routers/client/category.router.js')

app.use('/public', express.static('./public'))

// Admin routes
app.use('/admin/user', AdminUsers)
app.use('/admin/category', AdminCategory)

// Client routes
app.use('/user', User)
app.use('/category', Category)

app.use((req, res) => {
    res.status(404).send('404')
})

const start = () => {
    app.listen(process.env.PORT, () => { console.log(colors.yellow(`[Server]`) + ': ' + colors.green(`http://localhost:${process.env.PORT}`)) })
}


start()