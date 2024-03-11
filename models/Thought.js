const mongoose = require("mongoose");
const { Schema } = mongoose; // Destructure Schema directly from mongoose

const moment = require("moment");

// Define the schema for reactions
const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(), // Generate a new ObjectId by default
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280, // Maximum length of 280 characters
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Default to the current timestamp
    get: (createdAtVal) =>
      moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"), // Format the timestamp using moment
  },
});

// Define the main thought schema
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1, // Minimum length of 1 character
      maxlength: 280, // Maximum length of 280 characters
    },
    createdAt: {
      type: Date,
      default: Date.now, // Default to the current timestamp
      get: (createdAtVal) =>
        moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"), // Format the timestamp using moment
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema], // Array of reactions using the reactionSchema
  },
  {
    toJSON: {
      virtuals: true, // Include virtual properties when converting to JSON
      getters: true, // Apply getters when converting to JSON
    },
    id: false, // Exclude the default _id field
  }
);

// Define a virtual property to get the count of reactions
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// Create the Thought model based on the thoughtSchema
const Thought = mongoose.model("Thought", thoughtSchema);

module.exports = Thought;
