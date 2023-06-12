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

const Test = require('./test')

// Admin routes

for (const route in adminRouters) {
    app.use(`/admin/${route}`, adminRouters[route])
}

// Client routes

for (const route in clientRoutes) {
    app.use(`/api/${route}`, clientRoutes[route])
}




app.use('/test', Test)

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



