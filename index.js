import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import pg from "pg";

const app = express();
const port = 3000;
let book = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "books",
  password: "mysql",
  port: 5432,
});
db.connect();


app.get("/", async(req, res) => {
  try {
    let result = await db.query("select * from bookdetail");
    book = [];
    result.rows.forEach((bookItem)=>{
      book.push({
        isbn:bookItem.isbn,
        title: bookItem.title,
        author: bookItem.author,
        review: bookItem.review,
        rating: bookItem.rating,
        image: `https://covers.openlibrary.org/b/isbn/${bookItem.isbn}-L.jpg`
      })
    });
    res.render("index.ejs", {
      bookData: book
    });
  } catch (error) {
    console.log(error);
    res.render("index.ejs");
  }

  
});

app.get("/about",(req,res)=>{

    res.render("about.ejs");

});

app.get("/sortbyRating", async (req,res)=>{
  try {
    let result = await db.query("select * from bookdetail order by rating desc");
    book = [];
    result.rows.forEach((bookItem)=>{
      book.push({
        isbn:bookItem.isbn,
        title: bookItem.title,
        author: bookItem.author,
        review: bookItem.review,
        rating: bookItem.rating,
        image: `https://covers.openlibrary.org/b/isbn/${bookItem.isbn}-L.jpg`
      })
    });
    res.render("index.ejs", {
      bookData: book
    });
  } catch (error) {
    console.log(error);
    res.render("index.ejs");
  }
});

app.get("/sortbyName", async (req,res)=>{
  try {
    let result = await db.query("select * from bookdetail order by title");
    book = [];
    result.rows.forEach((bookItem)=>{
      book.push({
        isbn:bookItem.isbn,
        title: bookItem.title,
        author: bookItem.author,
        review: bookItem.review,
        rating: bookItem.rating,
        image: `https://covers.openlibrary.org/b/isbn/${bookItem.isbn}-L.jpg`
      })
    });
    res.render("index.ejs", {
      bookData: book
    });
  } catch (error) {
    console.log(error);
    res.render("index.ejs");
  }
});

app.post("/addReview", async (req, res) => {
  const isbn = req.body.isbn;
  let url = 'https://www.googleapis.com/books/v1/volumes?q=isbn%3D' + isbn;
  try {
    let result = await axios.get(url);
    res.render("addReview.ejs", {
      title: result.data['items'][0]['volumeInfo']['title'],
      author: result.data['items'][0]['volumeInfo']['authors'][0],
      isbn: isbn,
      image: `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`
    });
  } catch (error) {
    res.redirect("/")
  }

});

app.post("/reviewSubmission", async (req, res) => {
  let title = req.body.bookName;
  let author = req.body.authorName;
  let review = req.body.review;
  let rating = req.body.rating;
  let isbn = req.body.isbn;
  try {
    await db.query("insert into bookdetail values($1,$2,$3,$4,$5)",[isbn,title, author,review,rating]);
    res.redirect("/");
  } catch (error) {
    res.sendStatus(500);
  }
});

app.post("/edit",async (req,res)=>{
  let isbn = req.body.isbn;
  try {
    let result = await db.query("select * from bookdetail where isbn = $1",[isbn]);
    res.render("editReview.ejs", {
      title: result.rows[0].title,
      author: result.rows[0].author,
      isbn: isbn,
      rating: result.rows[0].rating,
      review: result.rows[0].review,
      image: `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`
    });
    
  } catch (error) {
    
  }
})

app.post("/reviewUpdate", async (req, res) => {
  let title = req.body.bookName;
  let author = req.body.authorName;
  let review = req.body.review;
  let rating = req.body.rating;
  let isbn = req.body.isbn;
  try {
    await db.query("update bookdetail set title = $1, author = $2, review = $3, rating = $4 where isbn = $5",[title, author,review,rating,isbn]);
    res.redirect("/");
  } catch (error) {
    res.sendStatus(500);
  }
});

app.post("/delete", async (req,res)=>{
  let isbn = req.body.isbn;
  try {
    await db.query("delete from bookdetail where isbn = $1",[isbn]);
    res.redirect("/");
  } catch (error) {
    res.sendStatus(500);
  }
})


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})
