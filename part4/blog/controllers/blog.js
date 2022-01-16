blogsRouter = require('express').Router();
const Blog = require('../models/blog');
/* const jwt = require('jsonwebtoken'); */
const mongoose = require('mongoose')
const userExtractor = require('../utils/userExtractor');
const blogExtractor = require('../utils/blogExtractor');

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {
        username: 1,
        name: 1,
    });
    
    response.json(blogs);
});

/* blogsRouter.get('/', userExtractor, async (request, response) => {
    const blog = await Blog.find({})
    const user = request.user

    const userBlogs = user.blogs.map( b => b.title);
    response.json(userBlogs);
}) */

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id);
    
    console.log(blog.id)
    if(blog) {
        response.json(blog)
    } else {
        response.status(404).end()
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

        response.json(savedBlog.toJSON());
    }
});



blogsRouter.put('/:id', userExtractor ,async(request, response, next) => {
    
    const body = request.body;
    const user = request.user;
    
    const blogs = {
        user: user.id,
        likes: body.likes,
        author: body.author,
        title: body.title,
        url: body.url
    }
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blogs, { new: true })
        const savedBlog = await updatedBlog.save();
        user.blogs = user.blogs.concat(savedBlog._id);
        await user.save();

        response.json(updatedBlog);
    }
    catch(exception) {
        next(exception)
    };
})

blogsRouter.delete('/:id', userExtractor, async (request, response, next) => {
    
   const blog =  await Blog.findById(request.params.id)
    const user = request.user;
   

    try {
        if (blog.user.toString() !== user.id.toString()) {
        response.status(401).json({ error: 'unauthorized action' }).end();
    }
    await Blog.findByIdAndRemove(id);
    
    console.log(user)
    console.log(blog.user)
    console.log(user.id)
    response.status(204).end();
    }
    catch(exception) {
        next(exception)
    };
     
});

module.exports = blogsRouter;