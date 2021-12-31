const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const likes = blogs.map(blog => blog.likes)
    let sum = 0
    likes.forEach((item) => sum += item)
    return sum
}

const favoriteBlog = (blogs) => {
    let maxLikes = 0
    blogs.forEach((blog) => {
        if (blog.likes > maxLikes) {
            maxLikes = blog.likes
        }
    })

    const favorite = blogs.filter(blog => blog.likes === maxLikes)
    return favorite[0]
}

const getMax = (object) => {
    return Object.keys(object).filter(x => {
         return object[x] == Math.max.apply(null, 
         Object.values(object))
   })
}

const mostBlogs = (blogs) => {
    var dict = {}
    blogs.forEach((blog) => {
        author = blog.author
        if (!dict[author]) {
            dict[author] = 1
        }
        else {
            dict[author] += 1
        }
    })
    const maxKey = getMax(dict)
    return {
        author: maxKey[0],
        blogs: dict[maxKey]
    }
}

const mostLikes = (blogs) => {
    var dict = {}
    blogs.forEach((blog) => {
        author = blog.author
        if (!dict[author]) {
            dict[author] = blog.likes
        }
        else {
            dict[author] += blog.likes
        }
    })
    const maxKey = getMax(dict)
    return {
        author: maxKey[0],
        likes: dict[maxKey]
    }
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}