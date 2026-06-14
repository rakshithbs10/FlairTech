import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import sql from "mssql";
import { getDb } from "../db";

const router = Router();

// Validation rules
const validateContact = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").trim().isEmail().withMessage("Valid email is required"),
  body("phone").optional().trim(),
  body("subject").trim().notEmpty().withMessage("Subject is required"),
  body("message").trim().notEmpty().withMessage("Message is required"),
];

// POST /api/contacts — submit contact form
router.post(
  "/",
  validateContact,
  async (req: Request, res: Response) => {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { name, email, phone, subject, message } = req.body;

    try {
      const pool = await getDb();
      await pool
        .request()
        .input("name", sql.NVarChar, name)
        .input("email", sql.NVarChar, email)
        .input("phone", sql.NVarChar, phone || null)
        .input("subject", sql.NVarChar, subject)
        .input("message", sql.NVarChar, message)
        .query(`
          INSERT INTO contacts (id, name, email, phone, subject, message, submitted_at)
          VALUES (NEWID(), @name, @email, @phone, @subject, @message, GETUTCDATE())
        `);

      res.status(201).json({
        message: "Thank you for contacting FlairTech Solutions. We will be in touch shortly.",
      });
    } catch (error) {
      console.error("Error saving contact:", error);
      res.status(500).json({ error: "Failed to submit contact form" });
    }
  }
);

export default router;