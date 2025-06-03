import React, { useState } from 'react';
import '../style/CreateJob.scss';
import axios from 'axios';
import { baseUrl } from '../../../utils/baseUrl';

function CreateJob() {
    const [form, setForm] = useState({
        company_name: '',
        job_position: '',
        about: '',
        experience: '',
        date: '',
        vacancy: '',
        compensation: '',
        job_type: '',
        job_description: '',
    });

    const [compensationType, setCompensationType] = useState('');
    const [customAmount, setCustomAmount] = useState('');
    const [apiMessage, setApiMessage] = useState({ text: '', type: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: files ? files[0] : value
        }));
    };

    const handleCompensationChange = (e) => {
        const value = e.target.value;
        setCompensationType(value);

        if (value === 'custom') {
            setForm(prev => ({ ...prev, compensation: customAmount || '' }));
        } else {
            setCustomAmount('');
            setForm(prev => ({ ...prev, compensation: value }));
        }
    };

    const handleCustomAmountChange = (e) => {
        const value = e.target.value;
        setCustomAmount(value);
        setForm(prev => ({ ...prev, compensation: value }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setApiMessage({ text: '', type: '' });

        const formData = new FormData();
        Object.entries(form).forEach(([key, value]) => {
            if (value !== null && value !== '') {
                formData.append(key, value);
            }
        });

        try {
            const res = await axios.post(`${baseUrl}/api/job/create`, formData, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });

            if (res.data.success) {
                setApiMessage({ text: res.data.message, type: 'success' });
                console.log(res.data.message);
                // Reset form after successful submission
                setForm({
                    company_name: '',
                    job_position: '',
                    about: '',
                    experience: '',
                    date: '',
                    vacancy: '',
                    compensation: '',
                    job_type: '',
                    job_description: '',
                });
                setCompensationType('');
                setCustomAmount('');
            } else {
                setApiMessage({ text: res.data.message, type: 'error' });
            }
        } catch (error) {
            setApiMessage({
                text: error.response?.data?.message || 'An error occurred',
                type: 'error'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='create-job-container'>
            {/* <h1 className='create-job-title'>Create New Job Posting</h1> */}
            <h1 className='create-job-title' style={{
                textAlign: 'center',
                color: '#34495e',
                margin: '0 auto 2rem',
                fontSize: '2.4rem',
                fontWeight: '600',
                textShadow: '0 1px 2px rgba(0,0,0,0.1)',
                maxWidth: '800px',
                lineHeight: '1.3'
            }}>
                Create Your Job Listing
            </h1>
            {apiMessage.text && (
                <div className={`api-message ${apiMessage.type}`}>
                    {apiMessage.text}
                </div>
            )}
            <form className='jobcard' onSubmit={submitHandler}>
                <div className="job_character">
                    <div className="job_char">
                        {/* <div className="job_card_image">
                            <div className="image-upload-placeholder">
                            </div>
                        </div> */}
                        <div className="job_position">
                            <h2>
                                <input
                                    type="text"
                                    className='company_name'
                                    placeholder="Company Name"
                                    name="company_name"
                                    value={form.company_name}
                                    onChange={handleChange}
                                    required
                                />
                            </h2>
                            <h4>
                                <input
                                    type="text"
                                    className='post_position'
                                    placeholder="Job Position"
                                    name="job_position"
                                    value={form.job_position}
                                    onChange={handleChange}
                                    required
                                />
                            </h4>
                        </div>
                    </div>
                    <div className="about_job">
                        <h2 className="heading">About</h2>
                        <textarea
                            className='about_text_area'
                            placeholder="Describe your company and what you're looking for..."
                            rows="5"
                            name="about"
                            value={form.about}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                </div>
                <div className="job_description_container">
                    <div className="job_quickdetails">
                        <div className="job_quick_right_top">
                            <div className="form-field">
                                <label>Experience:</label>
                                <select
                                    name="experience"
                                    value={form.experience}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select experience level</option>
                                    <option value="Fresher">Fresher</option>
                                    <option value="0-1">0-1 years</option>
                                    <option value="1-2">1-2 years</option>
                                    <option value="2-3">2-3 years</option>
                                    <option value="3-4">3-4 years</option>
                                    <option value="4-5">4-5 years</option>
                                    <option value="5+">5+ years</option>
                                </select>
                            </div>

                            <div className="form-field">
                                <label>Date:</label>
                                <input
                                    type="date"
                                    min={new Date().toISOString().split('T')[0]}
                                    name="date"
                                    value={form.date}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-field">
                                <label>Vacancy:</label>
                                <input
                                    type="number"
                                    min="1"
                                    placeholder="No. of openings"
                                    name="vacancy"
                                    value={form.vacancy}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-field">
                                <label>Compensation:</label>
                                <select
                                    value={compensationType}
                                    onChange={handleCompensationChange}
                                    required
                                >
                                    <option value="">Select compensation</option>
                                    <option value="Unpaid">Unpaid Intern</option>
                                    <option value="5k-10k">5k-10k</option>
                                    <option value="10k-20k">10k-20k</option>
                                    <option value="20k-30k">20k-30k</option>
                                    <option value="custom">Custom amount</option>
                                </select>
                                {compensationType === 'custom' && (
                                    <input
                                        type="number"
                                        value={customAmount}
                                        onChange={handleCustomAmountChange}
                                        placeholder="Enter custom amount"
                                        className="custom-amount-input"
                                        required
                                    />
                                )}
                            </div>

                            <div className="form-field">
                                <label>Type:</label>
                                <select
                                    name="job_type"
                                    value={form.job_type}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select job type</option>
                                    <option value="Intern">Intern</option>
                                    <option value="Job">Job</option>
                                    <option value="Remote">Remote</option>
                                    <option value="Hybrid">Hybrid</option>
                                </select>
                            </div>
                        </div>
                        <div className="job_action_btn">
                            <button
                                className="submit-btn"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Creating...' : 'Create Job Post'}
                            </button>
                        </div>
                    </div>
                    <div className="job_description">
                        <h3>Job Description</h3>
                        <textarea
                            className='job_description_textarea'
                            placeholder="Enter detailed job description, requirements, and responsibilities..."
                            rows="8"
                            name="job_description"
                            value={form.job_description}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CreateJob;