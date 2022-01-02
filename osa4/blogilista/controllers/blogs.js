const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    response.json(blogs)
})

blogRouter.delete('/:id', async (request, response) => {
    const id = request.params.id
    const user = request.user
    const toBeDeletedBlog = await Blog.findById(id)

    if (user.id.toString() !== toBeDeletedBlog.user.toString()) {
        return response.status(401).json({error: 'token missing or invalid'})
    }

    try {
        await Blog.findByIdAndDelete(id)
        response.status(200).end()
    } catch(exception) {
        response.status(400).end()
    }
})

blogRouter.put('/:id', async (request, response) => {
    const id = request.params.id
    const body = request.body

    const updatedBlog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    try{
        await Blog.findByIdAndUpdate(id, updatedBlog, {new: true})
        response.status(200).end()
    } catch(exception) {
        response.status(400).end()
    }
})
  
blogRouter.post('/', async (request, response) => {
    const body = request.body
    const user = request.user

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user._id
    })

    try { 
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog.id)
        await user.save()
        response.json(savedBlog.toJSON())
    } catch(exception) {
        response.status(400).end()
    }
})

module.exports = blogRouter