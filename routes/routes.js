const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const router = express.Router();
//Post Method
router.post("/signup", async (request, response) => {

    const hashedPassword = await bcrypt.hash(request.body.password, 10);
  const data = new User({
    username: request.body.username,
    email: request.body.email,
    password: hashedPassword,
    id: request.body.id,
  });

  try {
    const dataToSave = await data.save();
    response.status(200).json(dataToSave);
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
});

router.post("/login", async (request, response) => {
  try {
    const { username, password } = request.body;

    // Check if the user existss
    const user = await User.findOne({ username }).maxTimeMS(20000);
    if (!user) {
      return response.status(401).json({ message: "Invalid credentials" });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return response.status(401).json({ message: "Invalid credentials" });
    }

    // Generate an access token
    const accessToken = jwt.sign({ userId: user._id }, "your_secret_key", {
      expiresIn: "1h",
    });

    response.status(200).json({ message: "Login successful", token: accessToken });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});



//Update by ID Method
router.patch(`signup/:id`, async (request, response ) => {

    const id = request.params.id;
    try {
        // Find the user by ID
        const user = await User.findById(id);
    
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        // Update the user's details
        user.username = request.body.username || user.username;
        user.email = request.body.email || user.email;
        if (request.body.password) {
          const hashedPassword = await bcrypt.hash(request.body.password, 10);
          user.password = hashedPassword;
        }
    
        // Save the updated user to the database
        const updatedUser = await user.save();
    
        response.status(200).json(updatedUser);
      } catch (error) {
        response.status(400).json({ message: error.message });
      }
});

//Delete by ID Method
router.delete("/delete/:id", (req, res) => {
  res.send("Delete by ID API");
});
module.exports = router;
