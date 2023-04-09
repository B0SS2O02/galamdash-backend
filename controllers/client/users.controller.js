const models = require('../../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require('fs')
require('dotenv').config()

exports.login = async (req, res) => {
    if (!req.body.email) {
        res.status(400).json({ msg: "Email input is empty" });
    }
    if (!req.body.password) {
        res.status(400).json({ msg: "Password input is empty" });
    }
    const user = await models.Users.findOne({ where: { email: req.body.email } })
    if (!user) {
        res.status(404).json({ msg: "User is not define" });
    }
    if (!await bcrypt.compare(req.body.password, user.password)) {
        res.status(400).json({ msg: "Password is wrong" })
    }
    const token = jwt.sign(
        { user_id: user.id, type: user.type },
        process.env.TOKEN_KEY,
        {
            expiresIn: "5h",
        }
    );
    res.status(201).json({
        image: user.img,
        nick: user.nick,
        token: token
    });
}

exports.registry = async (req, res) => {
    if (!req.body.email) {
        res.status(400).json({ msg: "Email input is empty" });
    }
    if (!req.body.password) {
        res.status(400).json({ msg: "Password input is empty" });
    }
    if (!req.body.name) {
        res.status(400).json({ msg: "Name input is empty" });
    }
    if (!req.body.surname) {
        res.status(400).json({ msg: "Surname input is empty" });
    }
    const oldUser = await models.Users.findOne({
        where: {
            email: req.body.email.toLowerCase()
        }
    })
    if (oldUser) {
        return res.status(409).json({ msg: "User Already Exist" });
    }
    const encryptedUserPassword = await bcrypt.hash(req.body.password, 10);
    const user = await models.Users.create({
        nick: `${req.body.name} ${req.body.surname}`,
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email.toLowerCase(), // sanitize
        password: encryptedUserPassword,
    });
    const token = jwt.sign(
        { user_id: user.id, type: user.type },
        process.env.TOKEN_KEY,
        {
            expiresIn: "5h",
        }
    );
    res.status(201).json({
        image: user.img,
        nick: user.nick,
        token: token
    });
}

exports.verify = (req, res, next) => {
    if (!req.headers.authorization === false) {
        if (req.headers.authorization.split(' ')[0] === 'Bearer') {
            const token = req.headers.authorization.split(' ')[1]
            const { user_id, type } = jwt.verify(token, process.env.TOKEN_KEY)
            let user = models.Users.findOne({
                where: {
                    id: user_id
                }
            })
            if (!user) {
                res.status(503).json({
                    msg: 'You user undefine'
                })
            }
            if (user.ban) {
                res.status(503).json({
                    msg: 'You are baned'
                })
            }
            req.id = user_id
        }
    }
    next()
}

exports.cabinet = async (req, res) => {
    if (!req.params.id) {
        res.status(400).json({
            msg: "Id input is empty"
        })
    }
    let user = await models.Users.findOne({
        where: {
            id: req.params.id
        }
    })
    if (!user) {
        res.status(404).json({
            msg: 'Account not define'
        })
    }
    let data
    console.log(req.params.id, req.id)
    if (req.params.id == req.id) {
        data = {
            nick: user.nick,
            name: user.name,
            surname: user.surname,
            img: user.img,
            info: user.info,
            ball: user.ball,
            email: user.email,
            type: process.env.Types.split(' ')[user.type]
        }
    } else {
        data = {
            nick: user.nick,
            img: user.img,
            info: user.info,
            ball: user.ball,
            email: user.email
        }
    }
    res.status(200).json({ date: data })
}

exports.image = async (req, res) => {
    if (!req.id) {
        res.status(400).json({
            msg: "You not authorizated"
        })
    }
    let user = await models.Users.findOne({
        where: {
            id: req.id
        }
    })
    if (!user) {
        res.status(404).json({
            msg: 'Account not define'
        })
    }
    const old = user.img
    if (user.img !== "./public/images/default_avatar.jpg") {
        fs.unlink(old, (err) => {
            if (err) return console.log(err)
        });
    }
    await models.Users.update(
        {
            img: req.file.path
        },
        {
            where: {
                id: req.id
            }
        }
    )
    res.status(200).json({
        date: {
            img: req.file.path
        }
    })
}

exports.edit = async (req, res) => {
    if (!req.id) {
        res.status(400).json({
            msg: "You not authorizated"
        })
    }
    let user = await models.Users.findOne({
        where: {
            id: req.id
        }
    })
    if (!user) {
        res.status(404).json({
            msg: 'Account not define'
        })
    }
    let body = {}
    if (!req.body.nick == false) {
        body["nick"] = req.body.nick
    }
    if (!req.body.info == false) {
        body["info"] = req.body.info
    }
    if (!req.body.password == false) {
        body["password"] = await bcrypt.hash(req.body.password, 10);
    }
    await models.Users.update(
        body,
        {
            where: {
                id: req.id
            }
        }
    )
    delete body['password']
    res.status(200).json({
        date: body
    })
}