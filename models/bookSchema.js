const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true, // Ensures each book has a unique ID
        default: () => new mongoose.Types.ObjectId(), // Generates a UUID-like ObjectId
    },
    title: {
        type: String,
        required: true, // Ensures title is mandatory
        
    },
    author: {
        type: String,
        required: true, 
       
    },
    status: {
        type: String,
        // enum: ["available", "borrowed"], // Restricts status to only these values
        // default: "available", // By default, the book is available
        required: true, 
    },
    publishedYear: {
        type: Number,
        required: true, // Ensures year is mandatory
        // Ensures the year is not in the future
    },
    createdAt: {
        type: Date,
        default: Date.now, // Auto-generates timestamp on creation
    },
    
});

// Middleware to update 'updatedAt' on document updates
bookSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
