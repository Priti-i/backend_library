const express = require('express');
const router = express.Router();
const Book = require('./models/bookSchema');

// Create a new book
router.post('/books', async (req, res) => {
    try {
        const bookinfo={
            title:req.body.title,
            author:req.body.author,
            status:req.body.status,
            pyear:req.body.pyear
        }
        const newBook = new Book(bookinfo);
        const savedBook = await newBook.save();
        res.status(201).json({ message: "Book created successfully", data: savedBook });
    } catch (error) {
        res.status(400).json({ message: "Error creating book", error });
    }
});


router.get('/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: "Error fetching books", error });
    }
});

// // Get a book by ID
// router.get('/books/:id', async (req, res) => {
//     try {
//         const book = await Book.findById(req.params.id);
//         if (!book) {
//             return res.status(404).json({ message: "Book not found" });
//         }
//         res.status(200).json(book);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching book", error });
//     }
// });

// // Update a book by ID
// router.put('/books/:id', async (req, res) => {
//     try {
//         const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!updatedBook) {
//             return res.status(404).json({ message: "Book not found" });
//         }
//         res.status(200).json({ message: "Book updated successfully", data: updatedBook });
//     } catch (error) {
//         res.status(400).json({ message: "Error updating book", error });
//     }
// });

// // Delete a book by ID
router.delete('/books/:id', async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({ message: "Book deleted successfully", data: deletedBook });
    } catch (error) {
        res.status(500).json({ message: "Error deleting book", error });
    }
});

module.exports = router;
