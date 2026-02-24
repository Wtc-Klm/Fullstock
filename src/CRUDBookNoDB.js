require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

let books = [
    {
        id: 1,
        titlle: 'Book 1',
        author: 'Author 1'
    },
    {
        id: 2,
        titlle: 'Book 2',
        author: 'Author 2'
    },
    {
        id: 3,
        titlle: 'Book 3',
        author: 'Author 3'
    }
];

app.get("/", (req, res) => {
  res.send("Hello World Book");
});

app.get('/books', (req, res) => {
    res.json(books);
});

app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) res.status(404).send('Book not found');
    res.json(book);
});

app.post('/books', (req, res) => {
    const book = {
        id: books.length + 1,
        titlle: req.body.titlle,
        author: req.body.author
    };
    books.push(book);
    res.send(book);
});

app.put('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) res.status(404).send('Book not found');
    book.titlle = req.body.titlle;
    book.author = req.body.author;
    res.json(book);
});

app.delete('/books/:id', (req, res) => {
    const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
    if (bookIndex === -1) res.status(404).send('Book not found');
    const book = books[bookIndex];
    books.splice(bookIndex, 1);
    res.send(book);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));