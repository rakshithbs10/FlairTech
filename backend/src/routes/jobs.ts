import { Router, Request, Response } from "express";
import sql from "mssql";
import { getDb } from "../db";

const router = Router();

// GET /api/jobs — return all active jobs
router.get("/", async (_req: Request, res: Response) => {
  try {
    const pool = await getDb();
    const result = await pool.request().query(`
      SELECT 
        id,
        title,
        description,
        location,
        technologies,
        number_of_positions,
        posted_at
      FROM jobs
      WHERE is_active = 1
      ORDER BY posted_at DESC
    `);

    // Parse technologies from comma-separated string to array
    const jobs = result.recordset.map((job) => ({
      ...job,
      technologies: job.technologies
        ? job.technologies.split(",").map((t: string) => t.trim())
        : [],
    }));

    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

// GET /api/jobs/:id — return a single job
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const pool = await getDb();
    const result = await pool
      .request()
      .input("id", sql.UniqueIdentifier, req.params.id)
      .query(`
        SELECT 
          id,
          title,
          description,
          location,
          technologies,
          number_of_positions,
          posted_at
        FROM jobs
        WHERE id = @id AND is_active = 1
      `);

    if (result.recordset.length === 0) {
      res.status(404).json({ error: "Job not found" });
      return;
    }

    const job = result.recordset[0];
    res.status(200).json({
      ...job,
      technologies: job.technologies
        ? job.technologies.split(",").map((t: string) => t.trim())
        : [],
    });
  } catch (error) {
    console.error("Error fetching job:", error);
    res.status(500).json({ error: "Failed to fetch job" });
  }
});

export default router;