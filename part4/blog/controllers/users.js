const bcrypt = require('bcrypt');
const usersRouter = require('express').Router()
const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
    const user = await User.find({}).populate('blogs', { title: 1, });
    response.json(user);
});

usersRouter.post('/', async (request, response) => {
    const body = request.body;

     if (!body.password || !body.username) {
         return response.status(400).json({ error: 'missing password' }).end();
     } 

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);
    
    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    const savedUser = await user.save();
    response.json(savedUser);
    
});



module.exports = usersRouter;