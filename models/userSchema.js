const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true, 
        default: () => new mongoose.Types.ObjectId(), // Generates a UUID-like ObjectId
    },
    name: {
        type: String,
        required: true, 
        trim: true, 
    },
    email: {
        type: String,
        required: true,
        unique: true, 
        lowercase: true, // Converts email to lowercase
        match: [/.+@.+\..+/, "Please use a valid email address"], // Regex for email validation
    },
    password: {
        type: String,
        // required: true, 
        minlength: 6, 
    },
    role: {
        type: String,
        enum: ["user", "admin"], // Restricts role to 'user' or 'admin'
        default: "user", // Default role is 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now, // Auto-generates timestamp on creation
    },
    
});

const User = mongoose.model("User", userSchema);

module.exports = User;
