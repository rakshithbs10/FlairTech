import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import sql from "mssql";
import multer from "multer";
import { BlobServiceClient } from "@azure/storage-blob";
import { getDb } from "../db";

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"));
    }
  },
});

const validateApplication = [
  body("fullName").trim().notEmpty().withMessage("Full name is required"),
  body("email").trim().isEmail().withMessage("Valid email is required"),
  body("phone").trim().notEmpty().withMessage("Phone is required"),
  body("jobId").trim().notEmpty().withMessage("Job ID is required"),
  body("jobTitle").trim().notEmpty().withMessage("Job title is required"),
];

// POST /api/applications — submit job application
router.post(
  "/",
  upload.single("resume"),
  validateApplication,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    if (!req.file) {
      res.status(400).json({ error: "Resume PDF is required" });
      return;
    }

    const { fullName, email, phone, jobId, jobTitle } = req.body;

    try {
      // Upload resume to Azure Blob Storage
      const blobServiceClient = BlobServiceClient.fromConnectionString(
        process.env.AZURE_STORAGE_CONNECTION_STRING!
      );
      const containerClient = blobServiceClient.getContainerClient("resumes");
      const blobName = `${jobId}/${crypto.randomUUID()}.pdf`;
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);

      await blockBlobClient.uploadData(req.file.buffer, {
        blobHTTPHeaders: { blobContentType: "application/pdf" },
      });

      const resumeUrl = blobName;

      // Save application to Azure SQL
      const pool = await getDb();
      await pool
        .request()
        .input("jobId", sql.UniqueIdentifier, jobId)
        .input("jobTitle", sql.NVarChar, jobTitle)
        .input("fullName", sql.NVarChar, fullName)
        .input("email", sql.NVarChar, email)
        .input("phone", sql.NVarChar, phone)
        .input("resumeUrl", sql.NVarChar, resumeUrl)
        .query(`
          INSERT INTO applications (id, job_id, job_title, full_name, email, phone, resume_url, applied_at)
          VALUES (NEWID(), @jobId, @jobTitle, @fullName, @email, @phone, @resumeUrl, GETUTCDATE())
        `);

      res.status(201).json({
        message: `Thank you for applying for ${jobTitle}. Our team will be in touch.`,
      });
    } catch (error) {
      console.error("Error submitting application:", error);
      res.status(500).json({ error: "Failed to submit application" });
    }
  }
);

export default router;