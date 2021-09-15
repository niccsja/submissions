const mongoose = require('mongoose');
const app = require('../app');
const supertest = require('supertest');
const helper = require('../utils/list_helper');
const bcrypt = require('bcrypt');
const api = supertest(app);
const Blog = require('../models/blog');
const User = require('../models/user');

let token;

beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
    await User.deleteMany({});

    const userToCreate = {
        name: 'neilnich',
        username: 'nichneil',
        password: 'hcinlien',
    };

    const newUser = await api.post('/api/users').send(userToCreate);
    const loggedIn = await api.post('/api/login').send({
        username: newUser.body.username,
        password: userToCreate.password,
    });

    token = `bearer ${loggedIn.body.token}`;
});

describe('Blog information', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .set({'Authorization': `${token}`})
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    test('the UID is named id', async () => {
        const response = await api
                .get('/api/blogs')
                .set({'Authorization': `${token}`})
        const id = response.body.map((r) => r.id);

        expect(id).toBeDefined();
    });

    test('blogs are successfully created', async () => {
        const newBlog = {
            title: 'even newer blog',
            author: 'Mary',
            url: 'localhost:3003/blogs',
            likes: 2,
        };

        await api
            .post('/api/blogs')
            .set({ 'Authorization': `${token}` })
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    test('likes are missing so default 0', async () => {
        const newestBlog = {
            title: 'testing mongoose',
            author: 'Nicki',
            url: 'localhost:3003/blogs',
        };

        await api
            .post('/api/blogs/')
            .set({ Authorization: `${token}` })
            .send(newestBlog)
            .expect(200);
        blogs = await Blog.find({});

        const blogCheck = blogs.find((b) => b.title === newestBlog.title);

        expect(blogCheck.likes).toEqual(0);
    });

    test('title and url are missing, so bad request thrown', async () => {
        const dummyBlog = {
            author: 'Grace',
            likes: 15,
        };

        await api
            .post('/api/blogs/')
            .set({ Authorization: `${token}` })
            .send(dummyBlog)
            .expect(400);
        blogs = await Blog.find({});
        const names = blogs.map((b) => b.author);
        expect(names).not.toContain(dummyBlog.author);
    });

})

describe('User information', () => {
    beforeEach(async () => {
        await User.deleteMany({});

        const passwordHash = await bcrypt.hash('sekret', 10);
        const user = new User({ username: 'root', passwordHash });

        await user.save()
    });

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: 'rrobinson',
            name: 'Richard Robinson',
            password: 'nosnibor',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    });

    test('creation fails with proper statuscode and message if username is already taken', async () => {
        const usersAtStart = await helper.usersInDb();

        const existingUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen'
        }

        const result = await api
            .post('/api/users')
            .send(existingUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`username` to be unique');

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation fails and correct status code and message if username and password is missing', async () => {
        const usersAtStart = await helper.usersInDb();

        const incorrectUser = {
            name: 'paulie'
        };

        const result = await api
            .post('/api/users')
            .send(incorrectUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);

            expect(result.body.error).toContain('missing password')
            

            const usersAtEnd = await helper.usersInDb()
            expect(usersAtEnd).toHaveLength(usersAtStart.length);

    })

    test('creating fails in username or passwords are below required length', async () => {
        const usersAtStart = await helper.usersInDb();

        const shortUser = {
            username: 'ba',
            name: 'short user',
            password: 'ab',
        }

        const result = await api
            .post('/api/users')
            .send(shortUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

            expect(result.body.error).toContain(
                'minimum allowed length'
            );

            const usersAtEnd = await helper.usersInDb()
            expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})



afterAll(() => {
    mongoose.connection.close()
});