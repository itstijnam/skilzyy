import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/user.route.js"
import gigRouter from "./routes/gig.route.js"
import chatRouter from "./routes/chat.route.js"
import messageRouter from "./routes/message.route.js"
import connectDB from "./utils/db.js";
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix __dirname for ES Module
// const __filename = fileURLToPath(import.meta.url);
const __dirname = path.resolve();

// Serve static files from the "uploads" folder

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const corsOption = {
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
  credentials: true,
};

// Middleware
app.use(cors(corsOption));
app.use(express.json()); 
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Routes

app.use('/api/freelance', userRouter); 
app.use('/api/gig', gigRouter);
app.use('/api/chat', chatRouter);
app.use('/api/message', messageRouter);
// app.use(express.static(path.join(__dirname, "/client/dist")));
// app.get("*", (req,res)=>{
//   res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
// })

// Start the server
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running at http://localhost:${PORT}`);
});
