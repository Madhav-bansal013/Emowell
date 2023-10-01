const mongoose = require("mongoose");

// Define a Mongoose Schema for the User model
const userSchema = new mongoose.Schema(
  {
    // User's username (String) is required
    username: { type: String, required: true },

    // User's email (String) is required
    email: { type: String, required: true },

    // User's password (String) is required
    password: { type: String, required: true },
  },
  {
    // Specify the collection name in the MongoDB database
    collection: "users",
    // Automatically add "createdAt" and "updatedAt" timestamps
    timestamps: true,
  }
);

// Create a Mongoose model named "User" based on the userSchema
const User = mongoose.model("User", userSchema);

// Export the User model to use in other parts of the application
module.exports = User;
