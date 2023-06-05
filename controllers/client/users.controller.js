const models = require('../../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require('fs')
require('dotenv').config()
const AsyncHandler = require("express-async-handler")
const check = require('./check')

exports.login = AsyncHandler(async (req, res) => {
    try {
        if (check.variables(['email', 'password'], req.body, res)) {
            const user = await models.Users.findOne({ where: { email: req.body.email } })
            if (!user) {
                const user = await models.Users.findOne({ where: { nick: req.body.email } })
                if (!user) {
                    res.status(404).json({ msg: "User is not define" });

                } else if (user.ban) {
                    res.status(403).json({ msg: 'You are banned' })
                } else if (!await bcrypt.compare(req.body.password, user.password)) {
                    res.status(400).json({ msg: "Password is wrong" })
                } else {
                    const token = await jwt.sign(
                        { user_id: user.id, type: user.type },
                        process.env.TOKEN_KEY,
                        {
                            expiresIn: "24h",
                        }
                    )
                    res.status(200).json({
                        image: user.img,
                        nick: user.nick,
                        type: user.type,
                        token: token
                    })
                }

            } else if (user.ban) {
                res.status(403).json({ msg: 'You are banned' })
            } else if (!await bcrypt.compare(req.body.password, user.password)) {
                res.status(400).json({ msg: "Password is wrong" })
            } else {
                const token = await jwt.sign(
                    { user_id: user.id, type: user.type },
                    process.env.TOKEN_KEY,
                    {
                        expiresIn: "24h",
                    }
                )
                res.status(200).json({
                    image: user.img,
                    nick: user.nick,
                    type: user.type,
                    token: token
                })
            }
        }
    } catch (error) {
        console.log(error)
    }

})

exports.registry = async (req, res) => {
    try {
        if (check.variables(['email', 'password1', 'password2', 'name', 'surname', 'nick'], req.body, res)) {
            if (req.body.password1 !== req.body.password2) {
                res.status(400).json({
                    msg: 'Passwords not equal'
                })
            } else if (req.body.password1.length < 8) {
                res.status(400).json({
                    msg: 'Number of letters in less than 8'
                })
            } else {
                const oldUser = await models.Users.findOne({
                    where: {
                        [models.Sequelize.Op.or]: [
                            { email: req.body.email },
                            { nick: req.body.nick }
                        ]
                    }
                })
                if (!!oldUser) {
                    if (oldUser.nick == req.body.nick) {
                        res.status(400).json({
                            msg: 'This nick is have'
                        })
                    } else if (oldUser.email == req.body.email) {
                        res.status(400).json({
                            msg: 'This email is have'
                        })
                    }
                } else {
                    const encryptedUserPassword = await bcrypt.hash(req.body.password1, 10);
                    const user = await models.Users.create({
                        name: req.body.name,
                        surname: req.body.surname,
                        email: req.body.email.toLowerCase(),
                        nick: req.body.nick,
                        password: encryptedUserPassword,
                    });
                    const token = jwt.sign(
                        { user_id: user.id, type: user.type },
                        process.env.TOKEN_KEY,
                        {
                            expiresIn: "5h",
                        }
                    );

                    res.json({
                        image: user.img,
                        nick: user.nick,
                        type: user.type,
                        token: token
                    });
                    console.log(res.json)
                }
            }
        }
    } catch (error) {
        console.log(error)
    }

}


exports.user = async (req, res) => {
    try {
        if (check.variables(['id'], req.params, res)) {
            let user = await models.Users.findOne({
                where: {
                    id: req.params.id
                }
            })
            if (!user) {
                res.status(404).json({
                    msg: 'Account not define'
                })
            } else {
                res.status(200).json({
                    nick: user.nick,
                    img: user.img,
                    info: user.info,
                    ball: user.ball,
                    email: user.email
                })
            }
        }
    } catch (error) {
        console.log(error)
    }
}

exports.my = async (req, res) => {
    try {
        if (check.variables(['id'], req, res)) {
            let user = await models.Users.findOne({
                where: {
                    id: req.id
                }
            })
            if (!user) {
                res.status(404).json({
                    msg: 'Account not define'
                })
            } else {
                res.status(200).json({
                    nick: user.nick,
                    name: user.name,
                    surname: user.surname,
                    img: user.img,
                    info: user.info,
                    ball: user.ball,
                    email: user.email,
                    type: process.env.Types.split(' ')[user.type]
                })
            }
        }
    } catch (error) {
        console.log(error)
    }
}



exports.edit = async (req, res) => {
    if (check.variables(['id'], req, res, 'You are not logined')) {
        if (check.variables(['nick', 'email', 'name', 'surname'], req.body, res)) {
            let user = await models.Users.findOne({
                where: {
                    id: req.id
                }
            })
            if (!user) {
                res.status(404).json({
                    msg: 'Account not define'
                })
            } else {
                let body = {}

                const old = user.img
                if (!!req.file) {
                    if (user.img !== "public/images/default_avatar.jpg") {
                        fs.unlink(old, (err) => {
                            if (err) return console.log(err)
                        });
                    }
                    body["img"] = req.file.path
                }


                let nickname = await models.Users.findOne({
                    where: {
                        nick: req.body.nick
                    }
                })
                let email = await models.Users.findOne({
                    where: {
                        email: req.body.email
                    }
                })
                if (user.nick === req.body.nick) {
                    nickname = null
                }
                if (user.email === req.body.email) {
                    email = null
                }
                if (!!nickname) {
                    res.status(400).json({
                        msg: "This nick already have"
                    })
                } else if (!!email) {
                    res.status(400).json({
                        msg: "This email already have"
                    })
                } else {
                    body["nick"] = req.body.nick
                    body["info"] = req.body.info || ''
                    body['email'] = req.body.email
                    body['name'] = req.body.name
                    body['surname'] = req.body.surname
                    // body["password"] = await bcrypt.hash(req.body.password, 10);
                    await models.Users.update(
                        body,
                        {
                            where: {
                                id: req.id
                            }
                        }
                    )
                    res.status(200).json({
                        nick: req.body.nick,
                        info: req.body.info,
                    })
                }

            }
        }
    }
}



