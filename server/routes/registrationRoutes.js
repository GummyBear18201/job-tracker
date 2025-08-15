import express from "express";
import db from "../db/db.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/signUp", async (req, res) => {
  const { email, password } = req.body;

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await db.query(
      "INSERT INTO users (email, password, settings) VALUES ($1, $2, $3)",
      [email, hashedPassword, { goal: 50 }]
    );
    const result = await db.query("SELECT id FROM users WHERE email = $1", [
      email,
    ]);
    const userId = result.rows[0].id;

    res.status(201).json({ message: "User registered successfully", userId });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Failed to register user" });
  }
});

router.post("/signIn", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await db.query(
      "SELECT id, password, settings FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const storedHashedPassword = result.rows[0].password;
    const isMatch = await bcrypt.compare(password, storedHashedPassword);

    if (!isMatch) {
      console.log("Invalid password");
      return res.status(401).json({ error: "Invalid email or password" });
    } else {
      console.log("User logged in successfully");
      const userId = result.rows[0].id;
      const settings = result.rows[0].settings;
      res
        .status(200)
        .json({ message: "User logged in successfully", userId, settings });
    }
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Server error during login" });
  }
});
export default router;
