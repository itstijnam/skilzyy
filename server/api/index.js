import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "../utils/db.js";
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

// routes
import userRouter from "../routes/user.route.js"
import gigRouter from "../routes/gig.route.js"
import chatRouter from "../routes/chat.route.js"
import messageRouter from "../routes/message.route.js"
import jobRouter from "../routes/job.route.js"
import governmentJobRouter from "../routes/govJob.route.js"


// Load environment variables
dotenv.config();
connectDB()

const app = express();
const PORT = process.env.PORT || 3000;

// __dirname workaround for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// CORS configuration
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
const allowedOrigins = [process.env.FRONTEND_URL, "https://skilzyy.com"];

const corsOptions = {
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
  credentials: true,
};


// Middleware
app.use(cors(corsOptions));
app.use(express.json()); 
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Routes

app.use('/api/freelance', userRouter); 
app.use('/api/gig', gigRouter);
app.use('/api/chat', chatRouter);
app.use('/api/message', messageRouter);
app.use('/api/job', jobRouter);
app.use('/api/governmentjob', governmentJobRouter);

// app.use(express.static(path.join(__dirname, "/client/dist")));
// app.get("*", (req,res)=>{
//   res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
// })

export default app;