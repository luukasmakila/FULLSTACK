const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const initBlogs = [
    {
        title: 'Tetsing is fun',
        author: 'Luukas',
        url: 'Tests.com',
        likes: 7
    },
    {
        title: 'Tetsing is fun part2',
        author: 'Luukas2',
        url: 'Tests.com2',
        likes: 14
    }
]
beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initBlogs[1])
    await blogObject.save()
})

const api = supertest(app)

test('there are 2 blogs', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(initBlogs.length)
})

test('identification field to be named id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
})

test('addign new blogs is possible', async () => {
    blogObject = {
        title: 'Tetsing is fun part3',
        author: 'Luukas3',
        url: 'Tests.com3',
        likes: 21
    }
    await api.post('/api/blogs').send(blogObject)

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(3)
})

test('if likes not defined it should be 0', async () => {
    blogObject = {
        title: 'Tetsing is fun part3',
        author: 'Luukas3',
        url: 'Tests.com3',
    }

    await api.post('/api/blogs').send(blogObject)
    
    const response = await api.get('/api/blogs')
    
    expect(response.body[2].likes).toEqual(0)
})

test('check if url and title !== null', async () => {
    blogObject = {
        title: "ltd",
        author: "luukas",
        likes: 3
    }

    await api.post('/api/blogs').send(blogObject).expect(400)
    const response = await api.get('/api/blogs')
    console.log(response.body)
    expect(response.body).toHaveLength(initBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})