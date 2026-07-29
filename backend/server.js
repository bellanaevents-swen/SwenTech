import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Enable JSON parsing if needed, though no APIs are remaining
app.use(express.json());

// Specific route mappings to match the HTML references to files in their new folders
app.get("/css/style.css", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "css", "style.css"));
});

app.get("/js/main.js", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "js", "main.js"));
});

app.get("/assets/images/LogoSwen.png", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "images", "LogoSwen.png"));
});

app.get("/assets/images/background1.png", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "images", "background1.png"));
});

// Serve the rest of the static files from the root directory
app.use(express.static(path.join(__dirname, "..")));

// Fallback for SPA routing/direct access to serve index.html for unknown routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Web server running successfully on http://0.0.0.0:${PORT}`);
});
