const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");
require("dotenv").config();

const SECRET_KEY = process.env.JWT_SECRET || "e3f1b7c6a1d25b79f3d2a4e6f7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6";

require('./db/config');
const User = require('./db/user');
const Email = require('./db/email');
const Contact = require('./db/contact');
const Review = require('./db/review');

const app = express();
app.use(express.json());
app.use(cors());

// === Routes ===
app.post('/add-email', async (req, res) => {
    let email = new Email(req.body);
    let result = await email.save();
    res.send(result);
});

app.post('/add-contact', async (req, res) => {
    let contact = new Contact(req.body);
    let result = await contact.save();
    res.send(result);
});

app.post('/add-review', async (req, res) => {
    let review = new Review(req.body);
    let result = await review.save();
    res.send(result);
});

// === Auth ===
app.post("/signup", async (req, res) => {
    try {
        const { name, email, password, phone, address, subscription } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, phone, address, subscription });
        await newUser.save();

        const token = jwt.sign({ email: newUser.email }, SECRET_KEY, { expiresIn: "1h" });
        res.status(201).json({ token });
    } catch (error) {
        console.error("Signup Error:", error); 
        res.status(500).json({ message: "Error signing up" });
    }
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: "1h" });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: "Error logging in" });
    }
});

// === Auth Middleware ===
const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(403).json({ message: "Access denied" });

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).json({ message: "Invalid token" });
        req.user = decoded;
        next();
    });
};

// === Protected Route Example ===
app.get("/protected", verifyToken, (req, res) => {
    res.json({ message: "This is a protected route", user: req.user });
});

// === Proxy Video Stream to Python Server ===
const { createProxyMiddleware } = require("http-proxy-middleware");

app.use(
    '/video-stream',
    createProxyMiddleware({
        target: 'http://localhost:8000', // Python FastAPI server
        changeOrigin: true,
        pathRewrite: {
            '^/video-stream': '/stream', // maps /video-stream -> /stream
        },
    })
);

// === Start Server ===
app.listen(5000, () => {
    console.log('🚀 Node.js server running on http://localhost:5000');
});
