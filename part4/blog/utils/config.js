require('dotenv').config();

const PORT = process.env.PORT;
const MONGODB_URI =
    process.env.NODE_ENV === 'test'
        ? `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zmowm.mongodb.net/myFirstDatabase-test?retryWrites=true&w=majority`
        : `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zmowm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

module.exports = {
    MONGODB_URI,
    PORT,
};
