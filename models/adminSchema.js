const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true, // Ensures each admin has a unique ID
        default: () => new mongoose.Types.ObjectId(), // Generates a UUID-like ObjectId
    },
    username: {
        type: String,
        required: true, // Ensures the username is mandatory
        unique: true, // Ensures no duplicate usernames
        trim: true, // Removes leading/trailing whitespace
    },
    password: {
        type: String,
        required: true, // Ensures the password is mandatory
        minlength: 6, // Minimum length for password security
    },
    role: {
        type: String,
        enum: ["admin"], // Role is restricted to 'admin' for this schema
        default: "admin", // Default role
        required: true,
    },
    
});

// Middleware to update 'updatedAt' on document updates
adminSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
