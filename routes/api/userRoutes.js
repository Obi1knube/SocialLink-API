const router = require("express").Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/userController");

// GET all users
router.get("/", getAllUsers);

// GET a single user by its _id and populated thought and friend data
router.get("/:userId", getUserById);

// POST a new user
router.post("/", createUser);

// PUT to update a user by its _id
router.put("/:userId", updateUser);

// DELETE to remove user by its _id
router.delete("/:userId", deleteUser);

// Add a friend to a User's friend list
router.post("/:userId/friends/:friendId", addFriend);

// Remove a friend from a User's friend list
router.delete("/:userId/friends/:friendId", removeFriend);

module.exports = router;
