const Blog = require('../models/blog')

const blogExtractor = async (request, response, next) => {
    const id = request.params.id;
    request.blog = await Blog.findById(id)
    console.log(request)
    if(!request.blog) {
        response.status(404)
        .json({ error: 'blog not found' })
    }

    next()
}

module.exports = blogExtractor;