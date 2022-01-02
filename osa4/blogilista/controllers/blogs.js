const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogRouter.delete('/:id', async (request, response) => {
    const id = request.params.id
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

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0
    })

    try { 
        const savedBlog = await blog.save()
        response.json(savedBlog.toJSON())
    } catch(exception) {
        response.status(400).end()
    }
})

module.exports = blogRouter