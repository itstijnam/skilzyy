import React, { useEffect, useState } from 'react';
import '../style/CreateGovJob.scss';
import axios from 'axios';
import { baseUrl } from '../../../utils/baseUrl';

function CreateGovJob() {
  const [form, setForm] = useState({
    gov_job_post: '',
    auth_country: '',
    gov_job_appl_start: '',
    gov_job_last_start: '',
    gov_job_exam_date: '',
    gov_quick_view: '',
    gov_detailed_description: '',
    gov_general_fee: '',
    gov_female_fee: '',
    gov_obc_fee: '',
    gov_scst_fee: '',
    gov_male_min_age: '',
    gov_male_max_age: '',
    gov_female_min_age: '',
    gov_female_max_age: '',
    gov_apply_link: '',
    gov_notification_link: '',
    image: null
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm(prev => ({ ...prev, image: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Auto-detect country on mount
  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        setForm(prev => ({ ...prev, auth_country: data.country_name }));
      } catch (err) {
        console.error('Failed to detect country:', err);
      }
    };

    fetchCountry();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      formData.append('gov_job_post', form.gov_job_post);
      formData.append('auth_country', form.auth_country);
      formData.append('gov_job_appl_start', form.gov_job_appl_start);
      formData.append('gov_job_last_start', form.gov_job_last_start);
      formData.append('gov_job_exam_date', form.gov_job_exam_date);
      formData.append('gov_quick_view', form.gov_quick_view);
      formData.append('gov_detailed_description', form.gov_detailed_description);
      formData.append('gov_general_fee', form.gov_general_fee);
      formData.append('gov_female_fee', form.gov_female_fee);
      formData.append('gov_obc_fee', form.gov_obc_fee);
      formData.append('gov_scst_fee', form.gov_scst_fee);
      formData.append('gov_male_min_age', form.gov_male_min_age);
      formData.append('gov_male_max_age', form.gov_male_max_age);
      formData.append('gov_female_min_age', form.gov_female_min_age);
      formData.append('gov_female_max_age', form.gov_female_max_age);
      formData.append('gov_apply_link', form.gov_apply_link);
      formData.append('gov_notification_link', form.gov_notification_link);
      if (form.image) formData.append('image', form.image);

      const res = await axios.post(`${baseUrl}/api/governmentjob/create`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      });

      if (res.data.success) {
        setSuccess('Job created successfully!');
        // Reset form
        setForm({
          gov_job_post: '',
          auth_country: '',
          gov_job_appl_start: '',
          gov_job_last_start: '',
          gov_job_exam_date: '',
          gov_quick_view: '',
          gov_detailed_description: '',
          gov_general_fee: '',
          gov_female_fee: '',
          gov_obc_fee: '',
          gov_scst_fee: '',
          gov_male_min_age: '',
          gov_male_max_age: '',
          gov_female_min_age: '',
          gov_female_max_age: '',
          gov_apply_link: '',
          gov_notification_link: '',
          image: null
        });
        setPreviewImage(null);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create job');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='create_job_container'>
      <h1 className="form_heading">Create Government Job Posting</h1>

      {error && <div className="error_message">{error}</div>}
      {success && <div className="success_message">{success}</div>}

      <form onSubmit={submitHandler}>
        <div className="select_image">
          <label htmlFor="job-image">
            {previewImage ? (
              <img src={previewImage} alt="Job Preview" />
            ) : (
              <div className="image_placeholder">
                <span>+ Upload Job Image</span>
              </div>
            )}
          </label>
          <input
            type="file"
            id="job-image"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
            required
          />
        </div>

        <div className="job_form">
          <div className="field_container top_sub">
            <div className="top_sub_container">
              <label>Post Title*</label>
              <input
                type="text"
                name="gov_job_post"
                value={form.gov_job_post}
                onChange={handleChange}
                required
              />
            </div>
            <div className="top_sub_container">
              <label>Country*</label>
              <input
                type="text"
                name="auth_country"
                value={form.auth_country}
                onChange={handleChange}
                disabled
                required
              />
            </div>
          </div>

          <div className="field_container date_field">
            <div className="sub_field_container">
              <label>Application Start Date*</label>
              <input
                type="date"
                name="gov_job_appl_start"
                value={form.gov_job_appl_start}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            <div className="sub_field_container">
              <label>Last Date to Apply*</label>
              <input
                type="date"
                name="gov_job_last_start"
                value={form.gov_job_last_start}
                onChange={handleChange}
                min={form.gov_job_appl_start || new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            <div className="sub_field_container">
              <label>Exam Date</label>
              <input
                type="date"
                name="gov_job_exam_date"
                value={form.gov_job_exam_date}
                onChange={handleChange}
                min={form.gov_job_last_start || new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          <div className="field_container">
            <label>Quick View*</label>
            <textarea
              name="gov_quick_view"
              value={form.gov_quick_view}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field_container">
            <label>Detailed Description*</label>
            <textarea
              name="gov_detailed_description"
              value={form.gov_detailed_description}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="application_exam_fees">
          <h3>Application Fees*</h3>
          <div className="cat_exam_fee">
            <label>General*</label>
            <input
              type="number"
              name="gov_general_fee"
              value={form.gov_general_fee}
              onChange={handleChange}
              required
            />
          </div>
          <div className="cat_exam_fee">
            <label>Female Candidate*</label>
            <input
              type="number"
              name="gov_female_fee"
              value={form.gov_female_fee}
              onChange={handleChange}
              required
            />
          </div>
          <div className="cat_exam_fee">
            <label>OBC*</label>
            <input
              type="number"
              name="gov_obc_fee"
              value={form.gov_obc_fee}
              onChange={handleChange}
              required
            />
          </div>
          <div className="cat_exam_fee">
            <label>SC/ST*</label>
            <input
              type="number"
              name="gov_scst_fee"
              value={form.gov_scst_fee}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="gov_job_age">
          <h3>Age Requirements*</h3>
          <div className="age_section">
            <h4>For Male Candidates</h4>
            <div className="age_inputs">
              <div>
                <label>Minimum Age*</label>
                <input
                  type="number"
                  name="gov_male_min_age"
                  value={form.gov_male_min_age}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Maximum Age*</label>
                <input
                  type="number"
                  name="gov_male_max_age"
                  value={form.gov_male_max_age}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="age_section">
            <h4>For Female Candidates</h4>
            <div className="age_inputs">
              <div>
                <label>Minimum Age*</label>
                <input
                  type="number"
                  name="gov_female_min_age"
                  value={form.gov_female_min_age}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Maximum Age*</label>
                <input
                  type="number"
                  name="gov_female_max_age"
                  value={form.gov_female_max_age}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div className="link_container">
          <div className="field_container">
            <label>Apply Link*</label>
            <input
              type="url"
              name="gov_apply_link"
              value={form.gov_apply_link}
              onChange={handleChange}
              pattern="https?://.+"
              required
            />
          </div>
          <div className="field_container">
            <label>Notification Link*</label>
            <input
              type="url"
              name="gov_notification_link"
              value={form.gov_notification_link}
              onChange={handleChange}
              pattern="https?://.+"
              required
            />
          </div>
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create Job Posting'}
        </button>
      </form>
    </div>
  );
}

export default CreateGovJob;