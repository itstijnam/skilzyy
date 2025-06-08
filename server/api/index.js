import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./utils/db.js";
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import serverless from "serverless-http";

// routes
import userRouter from "./routes/user.route.js"
import gigRouter from "./routes/gig.route.js"
import chatRouter from "./routes/chat.route.js"
import messageRouter from "./routes/message.route.js"
import jobRouter from "./routes/job.route.js"

// Fix __dirname for ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env
dotenv.config();

// DB connection
await connectDB(); // ensure this completes before handling requests

// Express app setup
const app = express();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const corsOption = {
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
  credentials: true,
};

app.use(cors(corsOption));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/freelance', userRouter); 
app.use('/api/gig', gigRouter);
app.use('/api/chat', chatRouter);
app.use('/api/message', messageRouter);
app.use('/api/job', jobRouter);

// Export the handler for Vercel
export const handler = serverless(app);
