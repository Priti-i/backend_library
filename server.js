const express = require('express');
var bodyParser = require('body-parser')
const app = express();
const ejs = require('ejs');
const cors = require("cors");

const mongo = require('mongoose');
const Book = require('./models/bookSchema');
const User = require('./models/userSchema');
const Admin = require('./models/adminSchema');

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
      res.status(201).json({ message: "Book created successfully", data: savedBook });
  } catch(err){
    console.log(err);}
});




app.listen(3000,()=>{
    console.log('Server started');
})

