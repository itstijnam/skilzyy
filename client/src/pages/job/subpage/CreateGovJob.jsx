import React, { useEffect, useState } from 'react';
import '../style/CreateGovJob.scss';
import axios from 'axios';
import { baseUrl } from '../../../utils/baseUrl';

function CreateGovJob() {
  const [form, setForm] = useState({
    post: '',
    applicationStart: '',
    lastDate: '',
    examDate: '',
    quickView: '',
    description: '',
    country: '',
    fees: {
      general: '',
      female: '',
      obc: '',
      scst: ''
    },
    age: {
      boysMin: '', 
      boysMax: '',
      girlsMin: '',
      girlsMax: ''
    },
    applyLink: '',
    notificationLink: '',
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

  const handleNestedChange = (parent, name, value) => {
    setForm(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [name]: value
      }
    }));
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
        setForm(prev => ({ ...prev, country: data.country_name }));
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
      formData.append('post', form.post);
      formData.append('applicationStart', form.applicationStart);
      formData.append('lastDate', form.lastDate);
      formData.append('examDate', form.examDate);
      formData.append('quickView', form.quickView);
      formData.append('description', form.description);
      formData.append('country', form.country);
      formData.append('fees', JSON.stringify(form.fees));
      formData.append('age', JSON.stringify(form.age));
      formData.append('applyLink', form.applyLink);
      formData.append('notificationLink', form.notificationLink);
      if (form.image) formData.append('image', form.image);

      const res = await axios.post(`${baseUrl}/api/create`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      });

      if (res.data.success) {
        setSuccess('Job created successfully!');
        // Reset form
        setForm({
          post: '',
          applicationStart: '',
          lastDate: '',
          examDate: '',
          quickView: '',
          description: '',
          fees: {
            general: '',
            female: '',
            obc: '',
            scst: ''
          },
          age: {
            boysMin: '',
            boysMax: '',
            girlsMin: '',
            girlsMax: ''
          },
          applyLink: '',
          notificationLink: '',
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
          />
        </div>

        <div className="job_form">
          <div className="field_container top_sub">
            <div className="top_sub_container">
              <label>Post Title*</label>
              <input
                type="text"
                name="post"
                value={form.post}
                onChange={handleChange}
                required
              />
            </div>
            <div className="top_sub_container">
              <label>Country</label>
              <input
                type="text"
                name="country"
                value={form.country}
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
                name="applicationStart"
                value={form.applicationStart}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            <div className="sub_field_container">
              <label>Last Date to Apply*</label>
              <input
                type="date"
                name="lastDate"
                value={form.lastDate}
                onChange={handleChange}
                min={form.applicationStart || new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            <div className="sub_field_container">
              <label>Exam Date</label>
              <input
                type="date"
                name="examDate"
                value={form.examDate}
                onChange={handleChange}
                min={form.lastDate || new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          <div className="field_container">
            <label>Quick View*</label>
            <textarea
              name="quickView"
              value={form.quickView}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field_container">
            <label>Detailed Description*</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="application_exam_fees">
          <h3>Application Fees</h3>
          <div className="cat_exam_fee">
            <label>General*</label>
            <input
              type="number"
              value={form.fees.general}
              onChange={(e) => handleNestedChange('fees', 'general', e.target.value)}
              required
            />
          </div>
          <div className="cat_exam_fee">
            <label>Female Candidate*</label>
            <input
              type="number"
              value={form.fees.female}
              onChange={(e) => handleNestedChange('fees', 'female', e.target.value)}
              required
            />
          </div>
          <div className="cat_exam_fee">
            <label>OBC*</label>
            <input
              type="number"
              value={form.fees.obc}
              onChange={(e) => handleNestedChange('fees', 'obc', e.target.value)}
              required
            />
          </div>
          <div className="cat_exam_fee">
            <label>SC/ST*</label>
            <input
              type="number"
              value={form.fees.scst}
              onChange={(e) => handleNestedChange('fees', 'scst', e.target.value)}
              required
            />
          </div>
        </div>

        <div className="gov_job_age">
          <h3>Age Requirements</h3>
          <div className="age_section">
            <h4>For Male Candidates</h4>
            <div className="age_inputs">
              <div>
                <label>Minimum Age*</label>
                <input
                  type="number"
                  value={form.age.boysMin}
                  onChange={(e) => handleNestedChange('age', 'boysMin', e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Maximum Age*</label>
                <input
                  type="number"
                  value={form.age.boysMax}
                  onChange={(e) => handleNestedChange('age', 'boysMax', e.target.value)}
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
                  value={form.age.girlsMin}
                  onChange={(e) => handleNestedChange('age', 'girlsMin', e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Maximum Age*</label>
                <input
                  type="number"
                  value={form.age.girlsMax}
                  onChange={(e) => handleNestedChange('age', 'girlsMax', e.target.value)}
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
              name="applyLink"
              value={form.applyLink}
              onChange={handleChange}
              required
            />
          </div>
          <div className="field_container">
            <label>Notification Link*</label>
            <input
              type="url"
              name="notificationLink"
              value={form.notificationLink}
              onChange={handleChange}
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