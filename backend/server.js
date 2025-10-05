const jsonServer = require("json-server");
const cors = require("cors");
const express = require("express");
const multer = require("multer");
const path = require("path");
const bcrypt = require("bcrypt");

const app = jsonServer.create();
const router = jsonServer.router("db.json");
const db = router.db;

app.use(cors());
app.use(express.json()); 
app.use(jsonServer.defaults());


const uploadDir = path.join(__dirname, "uploads");

app.use("/uploads", express.static(uploadDir));


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });


app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});


app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = db.get("users").find({ email }).value();
  if (existingUser) {
    return res.status(400).json({ success: false, message: "Email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: Date.now(),
    name,
    email,
    password: hashedPassword,
    avatar: `https://i.pravatar.cc/150?u=${email}`,
  };

  db.get("users").push(newUser).write();

  res.json({ success: true, message: "User registered successfully", user: newUser });
});


app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = db.get("users").find({ email }).value();

  if (user && await bcrypt.compare(password, user.password)) {
    res.json({ success: true, message: "Login successful", user });
  } else {
    res.status(401).json({ success: false, message: "Invalid email or password" });
  }
});


app.post("/posts", upload.single("image"), (req, res) => {
 
  const { title, description, authorName } = req.body;
  
 
  const imagePath = req.file 
    ? `http://localhost:5000/uploads/${req.file.filename}` 
    : null;
    
  
  if (!title || !description || !authorName) {
    
    return res.status(400).json({ success: false, message: "Missing required fields (title, description, authorName)." });
  }

  const newPost = {
    id: Date.now(),
    title,
    description,
    
    authorName, 
    image: imagePath,
    date: new Date().toLocaleString(),
  };

  db.get("posts").push(newPost).write();

  res.status(201).json({ success: true, message: "Post created", post: newPost });
});


app.use(router);

const port = 5000;
app.listen(port, () => {
  console.log(`🚀 JSON Server running on http://localhost:${port}`);
});