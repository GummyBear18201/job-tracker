import express from "express";
import db from "../db/db.js";
const router = express.Router();

router.put("/editGoal", async (req, res) => {
  const { userId, goal } = req.body;

  try {
    await db.query(
      `UPDATE users
       SET settings = jsonb_set(settings, '{goal}', to_jsonb($1::int), true)
       WHERE id = $2`,
      [goal, userId]
    );

    res.status(200).json({ message: "Goal updated successfully" });
  } catch (err) {
    console.error("Error updating goal:", err);
    res.status(500).json({ error: "Failed to update goal" });
  }
});

router.get("/getGoal/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const result = await db.query("SELECT settings FROM users WHERE id = $1", [
      userId,
    ]);
    res.status(200).json(result.rows[0].settings.goal);
  } catch (err) {
    console.error("Error fetching goal:", err);
    res.status(500).json({ error: "Failed to fetch goal" });
  }
});
export default router;
