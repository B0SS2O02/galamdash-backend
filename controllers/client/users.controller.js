const models = require('../../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require('fs')
require('dotenv').config()
const AsyncHandler = require("express-async-handler")

exports.login = AsyncHandler(async (req, res) => {
    try {
        if (!req.body.email) {
            res.status(400).json({ msg: "Email input is empty" });
        } else
            if (!req.body.password) {
                res.status(400).json({ msg: "Password input is empty" });
            } else {
                const user = await models.Users.findOne({ where: { email: req.body.email } })
                if (!user) {

                    res.status(404).json({ msg: "User is not define" });
                } else if (user.ban) {
                    res.status(403).json({ msg: 'You are banned' })
                } else if (!await bcrypt.compare(req.body.password, user.password)) {
                    return res.status(400).json({ msg: "Password is wrong" })
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
                email: req.body.email
            }
        })
        if (oldUser) {
            return res.status(409).json({ msg: "Email Already Exist" });
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
        let body = {
            image: user.img,
            nick: user.nick,
            type: user.type,
            token: token
        }
        res.status(200).json(body);
    } catch (error) {
        console.log(error)
    }

}


exports.cabinet = async (req, res) => {
    try {

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
        res.status(200).json(data)

    } catch (error) {
        console.log(error)
    }
}

exports.image = async (req, res) => {
    try {
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
        if (user.img !== "public/images/default_avatar.jpg") {
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
            img: req.file.path
        })
    } catch (error) {
        console.log(error)
    }

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
    if (!!req.body.nick) {
        const nickname = await models.Users.findOne({
            where: {
                nick: req.body.nick
            }
        })
        if (!!nickname) {
            res.status(400).json({
                msg: "This nick already have"
            })
        } else {
            body["nick"] = req.body.nick
        }

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

