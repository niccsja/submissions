blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const jwt = require('jsonwebtoken');
const userExtractor = require('../utils/userExtractor');

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({})
            .populate('user', {
            username: 1,
            name: 1,
    });
    res.json(blogs);
});

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id);

    if (blog) {
        response.status(200).json(blog);
    } else {
        response.status(404).end();
    }
});

blogsRouter.post('/', userExtractor, async (request, response) => {
    const body = request.body;
    
    const user = request.user;

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user._id,
    });

    if (blog.title === undefined && blog.url === undefined) {
        response.status(400).end();
    } else {
        const savedBlog = await blog.save();
        user.blogs = user.blogs.concat(savedBlog._id);
        await user.save();

        response.json(savedBlog);
    }
});

blogsRouter.delete('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id);

    /* const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response
            .status(401)
            .json({ error: 'token missing or invalid ' });
    }
    const user = await User.findById(decodedToken.id); */
    const user = request.user

    if (blog.user.toString() !== user.id.toString()) {
        response.status(401).json({ error: 'unauthorized action' }).end();
    }
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
});

blogsRouter.put('/:id', async(request, response, next) => {
    const body = request.body;
    
    const blogs = {
        likes: body.likes
    }
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blogs, { new: true })
        response.json(updatedBlog);
    }
    catch(exception) {
        next(exception)
    };
})

module.exports = blogsRouter;