const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (request, response) => {
    Blog
    .find({})
    .then(blogs => {
    response.json(blogs)
    })
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