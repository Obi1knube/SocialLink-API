const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Define the thought schema using Mongoose
const thoughtSchema = new schema({
  //Define the textThought field
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  //Define the createdAt field with default value and custom getter method
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAt) => dateFormat(createdAt), //Custome gettermethod to format the timestamp
  },
  //Define the username field
  username: {
    type: String,
    required: true,
  },
  //Define the reactions field as an array of  reactionSchema
  reactions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Reaction",
    },
  ],
});

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});
//Create the Thought model using the thought schema
const Thought = mongoose.model("Thought", thoughtSchema);

//Export the Thought
module.exports = Thought;
