import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Enable JSON & URL encoded parsing with higher limits for image payloads
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));

// Configure multer memory storage for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 12 * 1024 * 1024 } // 12MB limit
});

// Helper for lazy Cloudinary initialization
function getCloudinary() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME || "kgdmg6su";
  const apiKey = process.env.CLOUDINARY_API_KEY || "833752915754486";
  const apiSecret = process.env.CLOUDINARY_API_SECRET || "GJUe2RPj0-lZetOrTDNECYIiPl8";
  const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET || "ml_default";

  if (cloudName && apiKey && apiSecret) {
    cloudinary.config({
      cloud_name: cloudName.trim(),
      api_key: apiKey.trim(),
      api_secret: apiSecret.trim(),
      secure: true
    });
    return { cloudinary, configured: true, cloudName: cloudName.trim(), uploadPreset };
  }
  return { cloudinary: null, configured: false, cloudName: cloudName ? cloudName.trim() : null, uploadPreset };
}

// MongoDB Atlas Schemas & Lazy Connection Handler
let mongoConnectPromise = null;

async function getMongoConnection() {
  const uri = process.env.MONGODB_URI || "mongodb+srv://bellanaevents_db_user:zn59UgjIXFe1Iq5a@cluster0.k4ptybx.mongodb.net/swen_portfolio?retryWrites=true&w=majority&appName=Cluster0";
  if (!uri) {
    return { connected: false, reason: "MONGODB_URI environment variable is not set." };
  }
  if (mongoose.connection.readyState === 1) {
    return { connected: true, dbName: mongoose.connection.name };
  }

  try {
    if (!mongoConnectPromise) {
      mongoConnectPromise = mongoose.connect(uri.trim(), {
        serverSelectionTimeoutMS: 5000
      });
    }
    await mongoConnectPromise;
    console.log(`Successfully connected to MongoDB Atlas database: ${mongoose.connection.name}`);
    return { connected: true, dbName: mongoose.connection.name };
  } catch (err) {
    mongoConnectPromise = null;
    console.warn("MongoDB Atlas connection error:", err.message);
    return { connected: false, error: err.message };
  }
}

// Attempt initial connection
getMongoConnection();

// Define Site Metadata Schemas
const siteMetadataSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  value: { type: mongoose.Schema.Types.Mixed },
  updatedAt: { type: Date, default: Date.now }
});

const projectSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: String,
  category: String,
  description: String,
  image: String,
  tags: [String],
  link: String,
  github: String,
  status: String,
  page: Number,
  createdAt: { type: Date, default: Date.now }
});

const reviewSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: String,
  title: String,
  text: String,
  rating: Number,
  avatar: String,
  status: { type: String, default: "active" },
  date: String,
  createdAt: { type: Date, default: Date.now }
});

const SiteMetadataModel = mongoose.models.SiteMetadata || mongoose.model("SiteMetadata", siteMetadataSchema);
const ProjectModel = mongoose.models.Project || mongoose.model("Project", projectSchema);
const ReviewModel = mongoose.models.Review || mongoose.model("Review", reviewSchema);

// API Route: Get MongoDB Atlas status
app.get("/api/mongodb/status", async (req, res) => {
  const conn = await getMongoConnection();
  const uriConfigured = true;

  let counts = { metadata: 0, projects: 0, reviews: 0 };
  if (conn.connected) {
    try {
      counts.metadata = await SiteMetadataModel.countDocuments();
      counts.projects = await ProjectModel.countDocuments();
      counts.reviews = await ReviewModel.countDocuments();
    } catch (e) {
      console.warn("Count error:", e);
    }
  }

  res.json({
    connected: conn.connected,
    uriConfigured: uriConfigured,
    dbName: conn.dbName || null,
    error: conn.error || conn.reason || null,
    counts: counts
  });
});

// API Routes: Site Metadata Storage
app.get("/api/metadata/:key", async (req, res) => {
  const conn = await getMongoConnection();
  if (!conn.connected) {
    return res.json({ success: false, connected: false, reason: conn.reason || conn.error });
  }

  try {
    const doc = await SiteMetadataModel.findOne({ key: req.params.key });
    if (!doc) {
      return res.json({ success: true, found: false, data: null });
    }
    return res.json({ success: true, found: true, data: doc.value });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

app.post("/api/metadata/:key", async (req, res) => {
  const conn = await getMongoConnection();
  if (!conn.connected) {
    return res.json({ success: false, connected: false, reason: conn.reason || conn.error });
  }

  try {
    const doc = await SiteMetadataModel.findOneAndUpdate(
      { key: req.params.key },
      { value: req.body.value, updatedAt: new Date() },
      { upsert: true, new: true }
    );
    return res.json({ success: true, data: doc.value });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// API Routes: Projects Metadata Management
app.get("/api/projects", async (req, res) => {
  const conn = await getMongoConnection();
  if (!conn.connected) {
    return res.json({ success: false, connected: false });
  }

  try {
    const projects = await ProjectModel.find().sort({ createdAt: -1 });
    return res.json({ success: true, connected: true, data: projects });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

app.post("/api/projects/sync", async (req, res) => {
  const conn = await getMongoConnection();
  if (!conn.connected) {
    return res.json({ success: false, connected: false });
  }

  try {
    const projectsList = req.body.projects || [];
    await ProjectModel.deleteMany({}); // replace collection with updated set
    if (projectsList.length > 0) {
      await ProjectModel.insertMany(projectsList);
    }
    return res.json({ success: true, count: projectsList.length });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// API Routes: Reviews Metadata Management
app.get("/api/reviews", async (req, res) => {
  const conn = await getMongoConnection();
  if (!conn.connected) {
    return res.json({ success: false, connected: false });
  }

  try {
    const reviews = await ReviewModel.find().sort({ createdAt: -1 });
    return res.json({ success: true, connected: true, data: reviews });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

app.post("/api/reviews/sync", async (req, res) => {
  const conn = await getMongoConnection();
  if (!conn.connected) {
    return res.json({ success: false, connected: false });
  }

  try {
    const reviewsList = req.body.reviews || [];
    await ReviewModel.deleteMany({});
    if (reviewsList.length > 0) {
      await ReviewModel.insertMany(reviewsList);
    }
    return res.json({ success: true, count: reviewsList.length });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// API Route: Get Cloudinary configuration status
app.get("/api/cloudinary-config", (req, res) => {
  const { configured, cloudName, uploadPreset } = getCloudinary();
  res.json({
    configured: configured || !!(cloudName && uploadPreset),
    hasServerCredentials: configured,
    cloudName: cloudName,
    uploadPreset: uploadPreset
  });
});


// API Route: Unified Media Upload Endpoint (Handles files and base64/URL data)
app.post("/api/upload", upload.single("file"), async (req, res) => {
  try {
    const { cloudinary: cld, configured } = getCloudinary();
    let fileSource = null;
    let folder = req.body.folder || "swen_portfolio";

    if (req.file) {
      // Buffer from multer file upload
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      fileSource = `data:${req.file.mimetype};base64,${b64}`;
    } else if (req.body.image || req.body.file) {
      fileSource = req.body.image || req.body.file;
    }

    if (!fileSource) {
      return res.status(400).json({ success: false, error: "No image file or data URL provided." });
    }

    // If Cloudinary server credentials are set, upload directly to Cloudinary
    if (configured && cld) {
      try {
        const result = await cld.uploader.upload(fileSource, {
          folder: folder,
          resource_type: "auto"
        });
        return res.json({
          success: true,
          url: result.secure_url,
          public_id: result.public_id,
          format: result.format,
          width: result.width,
          height: result.height,
          provider: "cloudinary"
        });
      } catch (signedErr) {
        console.warn("Signed Cloudinary upload failed, trying unsigned upload:", signedErr.message);
      }
    }

    // Unsigned upload option if upload preset and cloud name exist or fall back to defaults
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME || "kgdmg6su";
    const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET || "ml_default";
    if (cloudName && uploadPreset) {
      try {
        const formData = new FormData();
        formData.append("file", fileSource);
        formData.append("upload_preset", uploadPreset);
        formData.append("folder", folder);

        const cldRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: "POST",
          body: formData
        });

        if (cldRes.ok) {
          const cldData = await cldRes.json();
          return res.json({
            success: true,
            url: cldData.secure_url,
            public_id: cldData.public_id,
            provider: "cloudinary_unsigned"
          });
        }
      } catch (unsignedErr) {
        console.warn("Unsigned Cloudinary upload failed:", unsignedErr.message);
      }
    }

    // Fallback: return source data URL or path gracefully
    return res.json({
      success: true,
      url: fileSource,
      provider: "local_fallback",
      note: "Cloudinary credentials missing; stored as local image. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET to environment variables to enable Cloudinary cloud storage."
    });

  } catch (err) {
    console.error("Cloudinary upload error:", err);
    return res.status(500).json({
      success: false,
      error: err.message || "Failed to process image upload."
    });
  }
});

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

// Serve the rest of the static files from the root directory with html extension support
app.use(express.static(path.join(__dirname, ".."), { extensions: ["html"] }));

// Fallback for SPA routing/direct access to serve index.html for unknown routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Web server running successfully on http://0.0.0.0:${PORT}`);
});
