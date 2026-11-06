const express = require("express");
const path = require("path");

const { user, defaultSettings } = require("./data");

const app = express();
const PORT = 3000;

app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; connect-src 'self'; object-src 'none'; frame-ancestors 'none'",
  );
  res.setHeader("X-Frame-Options", "DENY");
  next();
});

app.use(express.json());

/*
 * Home page
 */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

/*
 * Profile API
 */
app.get("/api/profile", (req, res) => {
  const clientUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
  res.json(clientUser);
});

/*
 * Settings API
 */
app.get("/api/settings", (req, res) => {
  res.json(defaultSettings);
});

app.post("/api/settings", (req, res) => {
  const incomingSettings = req.body;
  const allowedKeys = new Set(["theme", "language", "fontSize"]);

  if (
    !incomingSettings ||
    typeof incomingSettings !== "object" ||
    Array.isArray(incomingSettings) ||
    Object.keys(incomingSettings).some((key) => !allowedKeys.has(key))
  ) {
    return res.status(400).json({ error: "Invalid settings." });
  }

  const settings = {
    theme: incomingSettings.theme ?? defaultSettings.theme,
    language: incomingSettings.language ?? defaultSettings.language,
    fontSize: incomingSettings.fontSize ?? defaultSettings.fontSize,
  };

  res.json({
    message: "Settings saved successfully.",
    settings,
  });
});

/*
 * Account page
 */
app.get("/account", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "account.html"));
});

app.use(express.static(path.join(__dirname, "..", "client")));

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Application running at http://localhost:${PORT}`);
  });
}

module.exports = app;
