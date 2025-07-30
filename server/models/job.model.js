import mongoose from "mongoose";

const applicationStatusSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { 
    type: String, 
    enum: ['applied', 'hired', 'rejected'],
    default: 'applied'
  },
  employerAction: {
    type: String,
    enum: ['pending', 'hired', 'rejected'],
    default: 'pending'
  },
  lastUpdated: { type: Date, default: Date.now }
});

const jobSchema = new mongoose.Schema({
  company_name: { type: String, required: true },
  post_name: { type: String, required: true },
  experience_level: { type: String }, 
  posted_date: { type: Date, default: Date.now },
  last_date: { type: Date },
  vacancy: { type: Number, required:true },
  compensation: { type: String },
  job_type: { type: String }, 
  job_about: { type: String },
  job_description: { type: String, required:true },
  applicants: [applicationStatusSchema], // Array of applicants with their statuses
  job_refer_link: {
    type: String,
    validate: {
      validator: (v) => /^https?:\/\/.+/.test(v),
      message: 'Invalid apply link URL.'
    }
  },
  job_status: { 
    type: String, 
    enum: ['pending', 'live', 'closed'],
    default: 'pending'
  },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

export const Job = mongoose.model('Job', jobSchema);