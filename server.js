const express = require('express');
var bodyParser = require('body-parser')
const app = express();
const ejs = require('ejs');
const cors = require("cors");
const mongo = require('mongoose');
const Book = require('./models/bookSchema');
const User = require('./models/userSchema');
const Admin = require('./models/adminSchema');
const bcrypt = require('bcrypt');


app.set('view engine', 'ejs');
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const bdURL= 'mongodb+srv://pritiy049:1priti23@cluster0.s4t48.mongodb.net/librarySystem?retryWrites=true&w=majority&appName=Cluster0';


  mongo.connect(bdURL);
  mongo.connection.on("error", (err) => {
    console.log("Error Connection Failed", err);
  });

app.get('/',(req,res)=>{
    res.send('Hello world');
})

//user register
app.post('/register', async (req,res)=>{
try{
  console.log("register",req.body);
  const user={
    name:req.body.name,
    password:req.body.pas,
    email:req.body.email,
    role:req.body.role,
   }
const User1 = new User(user);
const result=  await User1.save();
res.status(201).send({ message: "User  Register" });
}
catch(err){
console.log(err);}
  
})
app.get('/register', async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the database
    res.status(200).json(users); // Respond with the users
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: "Error fetching users", error });
  }
});


// User login
app.post('/register/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User Not Found" });
    }

    // Directly compare the entered password with the stored password
    if (password !== user.password) {
      return res.status(401).send({ message: "Invalid Credentials" });
    }

    res.status(200).send({ message: "Login Successful", user });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Login Failed" });
  }
});


// add book
app.post('/books', async (req, res) => {
  try {
      console.log("Book data received:", req.body);

      const bookinfo = {
          title: req.body.title,
          author: req.body.author,
          status: req.body.status,
          publishedYear: req.body.publishedYear
      };

      const newBook = new Book(bookinfo);
      const savedBook = await newBook.save();
      res.status(201).json({ message: "Book successfully Added", data: savedBook });
  } catch(err){
    console.log(err);}
});

// get book
app.get('/books', async (req, res) => {
  try {
      const books = await Book.find();
      res.status(200).json(books);
  } catch (error) {
      res.status(500).json({ message: "Error fetching books", error });
  }
});
// get user


//delete book
app.delete("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);
    if (deletedBook) {
      res.status(200).json({ message: "Book deleted successfully" });
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting book", error });
  }
});

// admin create
app.post('/admin', async (req, res) => {
  try {
    const adminInfo = {
      username: "priti",
      password: "123456",
      role: "admin"
    };

    console.log("Creating admin:", adminInfo);
    const newAdmin = new Admin(adminInfo);
    const savedAdmin = await newAdmin.save();

    // Send success response
    res.status(201).send({ message: "Admin successfully created", data: savedAdmin });
  } catch (err) {
    console.error("Error creating admin:", err);
    res.status(500).send({ message: "Error creating admin", error: err });
  }
});



//admin login
app.post('/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Retrieve admin details by username
    const admin = await Admin.findOne({ username });

    if (!admin) {
      // If no admin found
      return res.status(404).json({ message: 'Invalid username or password' });
    }

    //pare entered password with stored password
    const isPasswordValid = password === admin.password; // Replace this with bcrypt.compare() if passwords are hashed

    if (!isPasswordValid) {
      // If password doesn't match
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    res.status(200).json({ message: 'Login successful', data: { id: admin._id, username: admin.username, role: admin.role } });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});


app.listen(3000,()=>{
    console.log('Server started');
})




