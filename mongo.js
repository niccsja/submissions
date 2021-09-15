const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstackopen:${password}@cluster0.zmowm.mongodb.net/myFirstDatabase-test?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
});

const Blog = mongoose.model("Blog", blogSchema);

const blog = new Blog({
  title: "How mongoose helps developers",
  author: "Ville",
  url: "localhost:3003/blogs",
  likes: 8,
});

/* Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note);
  });
  mongoose.connection.close();
}); */

blog.save().then((result) => {
  console.log("blog saved!");
  mongoose.connection.close();
});
