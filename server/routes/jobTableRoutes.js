import express from "express";
import db from "../db/db.js";
const router = express.Router();
router.get("/:user_id", async (req, res) => {
  const userId = req.params.user_id;

  try {
    const result = await db.query(
      "SELECT * FROM jobtable WHERE user_id = $1 ORDER BY id DESC",
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Get jobs error:", err);
    res.status(500).json({ error: "Failed to get jobs" });
  }
});
router.post("/add", async (req, res) => {
  const { date, company, status, links, notes, user_id } = req.body;

  try {
    await db.query(
      "INSERT INTO jobtable (date, company, links, status, notes, user_id) VALUES ($1, $2, $3, $4, $5, $6)",
      [date, company, links, status, notes, user_id]
    );
    res.status(201).json({ message: "Job added successfully" });
  } catch (err) {
    console.error("Add job error:", err);
    res.status(500).json({ error: "Failed to add job" });
  }
});
router.put("/edit", async (req, res) => {
  const { id, date, company, status, links, notes, user_id } = req.body;

  console.log("Edit request from user:", user_id);

  try {
    const result = await db.query(
      `UPDATE jobtable 
           SET date = $1, company = $2, links = $3, status = $4, notes = $5 
           WHERE id = $6 AND user_id = $7`,
      [date, company, links, status, notes, id, user_id]
    );

    if (result.rowCount === 0) {
      return res.status(403).json({ error: "Not authorized or job not found" });
    }

    res.status(200).json({ message: "Job updated successfully" });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Failed to update job" });
  }
});
router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await db.query("DELETE FROM jobtable WHERE id = $1", [id]);
    res.status(200).json({ message: "Deleted" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Failed to delete item" });
  }
});
export default router;
