import mongoose from "mongoose";

const govJobSchema = new mongoose.Schema({
  gov_job_image: { type: String, default: '' },
  gov_job_post: { type: String, required: true },
  auth_country: { type: String, required: true },
  gov_job_appl_start: { type: Date, required: true },
  gov_job_last_start: { type: Date, required: true },
  gov_job_exam_date: { type: Date },
  gov_quick_view: { type: String, required: true },
  gov_detailed_description: { type: String, required: true },
  gov_general_fee: { type: Number, required: true },
  gov_female_fee: { type: Number, required: true },
  gov_obc_fee: { type: Number, required: true },
  gov_scst_fee: { type: Number, required: true },
  gov_male_min_age: { type: Number, required: true },
  gov_male_max_age: { type: Number, required: true },
  gov_female_min_age: { type: Number, required: true },
  gov_female_max_age: { type: Number, required: true },
  gov_apply_link: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /^https?:\/\/.+/.test(v),
      message: 'Invalid apply link URL.'
    }
  },
  gov_notification_link: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /^https?:\/\/.+/.test(v),
      message: 'Invalid notification link URL.'
    }
  }
}, { timestamps: true });

export const Govjob = mongoose.model('Govjob', govJobSchema);
