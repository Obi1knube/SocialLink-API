const { User, Thought } = require("../models");

const thoughtController = {
  // Get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  // Get a single thought by its _id
  getThoughtById(req, res) {
    const { thoughtId } = req.params;
    Thought.findOne({ _id: thoughtId })
      .select("-__v")
      .then((thought) => {
        if (!thought) {
          return res
            .status(404)
            .json({ message: "Thought with this id is not found" });
        }
        res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },

  // Create a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: "Thought not found" });
        }
        res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },

  // Update a thought by its _id
  updateThought(req, res) {
    const { thoughtId } = req.params;
    Thought.findOneAndUpdate({ _id: thoughtId }, req.body, { new: true })
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: "Thought not found" });
        }
        res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },

  // Delete a thought by its _id
  deleteThought(req, res) {
    const { thoughtId } = req.params;
    Thought.findOneAndDelete({ _id: thoughtId })
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: "Thought not found" });
        }
        res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },

  // Add a reaction to a thought
  addReaction(req, res) {
    const { thoughtId } = req.params;
    Thought.findOneAndUpdate(
      { _id: thoughtId },
      { $push: { reactions: req.body } },
      { new: true }
    )
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: "Thought not found" });
        }
        res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },

  // Delete a reaction from a thought by reactionId
  deleteReaction(req, res) {
    const { thoughtId, reactionId } = req.params;
    Thought.findOneAndUpdate(
      { _id: thoughtId },
      { $pull: { reactions: { reactionId } } },
      { new: true }
    )
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: "Thought not found" });
        }
        res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = thoughtController;
