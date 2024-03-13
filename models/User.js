// Import necessary modules from Mongoose
const mongoose = require("mongoose");
const { Schema, models } = require("mongoose");

// Create a new schema for the User model
const userSchema = new Schema(
  {
    // Define the username field
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    // Define the email field
    email: {
      type: String,
      required: true,
      unique: true,
      // Validate that the email matches a valid email address format
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
        "Please enter a valid email address",
      ],
    },
    // Define the thoughts field as an array of ObjectIds referencing the Thought model
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    // Define the friends field as an array of ObjectIds referencing the User model (self-reference)
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      //Include virtual properties when converting to JSON
      virtuals: true,
    },
    id: false, //Exclude the default "_id" field from the model
  }
);

// Create a virtual field called friendCount to retrieve the length of the friends array
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// Create the User model based on the userSchema
const User = mongoose.model("User", userSchema);

// Export the User model
module.exports = User;
