const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if (!blogs.length) {
        return 0
    }
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    if (!blogs.length) {
        return 0
    }
    return blogs.reduce((most, blog) => {
        return (blog.likes > most.likes) ? blog : most
    })
}

const mostBlogs = (blogs) => {
    if (!blogs.length) {
        return 0
    }
    const authors = blogs.map(blog => blog.author)
    const numberOfBlogsByAuthor = lodash.countBy(authors)
    const maxAuthor = lodash.maxBy(Object.keys(numberOfBlogsByAuthor), author => numberOfBlogsByAuthor[author])

    const result = {
        author: maxAuthor,
        blogs: numberOfBlogsByAuthor[maxAuthor]
    }
    return result

}

const mostLikes = (blogs) => {
    if (!blogs.length) {
        return 0
    }

    const likeList = lodash(blogs)
        .groupBy('author')
        .mapValues(likes => lodash.sumBy(likes, 'likes'))
        .toPairs()
        .maxBy(1)

    const result = {
        author: likeList[0],
        likes: likeList[1]
    }
    return result
}

module.exports = { 
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}