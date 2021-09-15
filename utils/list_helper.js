const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
    {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
    },
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
    },
    {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
    },
    {
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
    },
    {
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
    },
    {
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
    },
];

const dummy = (blogs) => {
    return blogs.length === 0 ? 1 : 1;
};

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes;
    };
    
    return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
   const reducer = (sum, item) => {
       return Math.max(sum, item.likes);
   };

   const max = blogs.reduce(reducer, 0);

   return blogs.find(b => b.likes === max);

};

const mostBlogs = (blogs) => {
      if (blogs.length === 0) return 'empty blog list';

      if (blogs.length === 1) {
          const { author } = blogs[0];
          return { author, blogs: 1 };
      }

      const authors = blogs.map((blog) => blog.author);
      const authorWithMostBlogs = _.maxBy(authors);
      const blogsCount = _.filter(blogs, {
          author: authorWithMostBlogs,
      }).length;

      return { author: authorWithMostBlogs, blogs: blogsCount };
};

const usersInDb = async () => {
    const users = await User.find({});
    return users.map((u) => u.toJSON());
};

const nonExistingId = async () => {
    const blog = new Blog({ title: 'willremovethissoon', author: 'me' });
    await blog.save();
    await blog.remove();

    return blog._id.toString();
};

const blogsInDb = async () => {
    const blogs = await Blog.find({});
    return blogs.map((blog) => blog.toJSON());
};


module.exports = {
    dummy,
    totalLikes,
    initialBlogs,
    favoriteBlog,
    usersInDb,
    blogsInDb,
    nonExistingId,
};