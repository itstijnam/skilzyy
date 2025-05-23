// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import dotenv from "dotenv";
// import connectDB from "../utils/db.js";
// import { app, server } from "../socket/socket.js";
// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// dotenv.config();

// const PORT = process.env.PORT || 3000;

// app.use(express.json());
// app.use(cookieParser());
// app.use(express.urlencoded({ extended: true }));

// const corsOption = {
//     origin: process.env.FRONTEND_URL || "*",
//     methods: ["GET", "POST", "DELETE", "PUT"],
//     credentials: true
// };
// app.use(cors(corsOption));

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.get("/", (req, res) => {
//     return res.status(200).json({
//         message: "I'm coming from backend",
//         success: true
//     });
// });


// server.listen(PORT, ()=>{
//     connectDB();
//     console.log(`http://localhost:${PORT}`);
// })