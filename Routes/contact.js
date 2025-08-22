import express from "express";

const router = express.Router();

// POST /contact -> receive form data
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Here you can save to database (optional)
    // Example: await ContactModel.create({ name, email, message });

    console.log("Contact form received:", req.body);

    res.status(200).json({ message: "Form submitted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
