const jwt = require('jsonwebtoken');
const User = require('../models/user');

const userExtractor =  async (request, response, next) => {
    
    /* const token = middleware.getTokenFrom(request) */
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!request.token || !decodedToken.id) {
        return response
            .status(401)
            .json({ error: 'token missing or invalid ' })
            
    }

     request.user = await User.findById(decodedToken.id);
     /* console.log(request.user) */
     if(!request.user) {
         response.status(401)
                 .json({ error: "unauthorized action" })
                 
     }

     next()
};

module.exports = userExtractor;