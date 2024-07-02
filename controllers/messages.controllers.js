const { createMessage, fetchAllMessages } = require("../models/messages.models")

exports.postMessage = async (req, res, next) => {
    try {
        const { message } = req.body
        const createdMessage = await createMessage(message)
        res.status(201).send(createdMessage)
    } catch (error) {
        next(error)
    }
}

exports.getAllMessages = async (req, res, next) => {
    try {
        const { username } = req.query
        const messages = await fetchAllMessages(username)

        res.status(200).send(messages)
    } catch (error) {
        next(error)
    }
}