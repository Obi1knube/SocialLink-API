// Import the reaction Schema
const reactionSchema = require("./ReactionSchema");

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
    type: stringify,
    required: true,
  },
  //Define the reactions field as an array of  reactionSchema
  reactions: [reactionSchema],
});
//Create the Thought model using the thought schema
const Thought = mongoose.model("Thought", thoughtSchema);

//Export the Thought
module.exports = Thought;
