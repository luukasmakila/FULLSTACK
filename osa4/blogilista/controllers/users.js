const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.post('/', async (request, response) => {
    const body = request.body
    
    if (body.password.length < 3) {
        return response.status(400).json({error: 'password is too short'})
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    //testattu toimivaksi request folderista löytyvien testien avulla
    try {
        const savedUser = await user.save()
        response.json(savedUser)
    } catch(exception) {
        response.status(400).json({error: 'username is too short'})
    }
})

userRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', {title: 1, author: 1, url: 1, likes: 1})
    response.json(users.map(user => user.toJSON()))
})

module.exports = userRouter