import React from 'react'
import '../style/GovJobCard.scss'
import { useSelector } from 'react-redux'
import useFormatDate from '../../../utils/useFormatDate';

function GovJobCard() {

  const {selectedGovJob} = useSelector(store => store.gov)
  console.log(selectedGovJob);

  return (
    <div className="gov-job-card">
      <div className="job-header">
        {selectedGovJob?.gov_job_image && (
          <div className="job-image">
            <img src={selectedGovJob?.gov_job_image} alt={selectedGovJob?.post} />
          </div>
        )}
        <h2>{selectedGovJob?.post}</h2>
        <p className="country">{selectedGovJob?.auth_country}</p>
      </div>

      <div className="job-dates">
        <div className="date-item">
          <span>Application Start:</span>
          <strong>{useFormatDate(selectedGovJob?.gov_job_appl_start)}</strong>
        </div>
        <div className="date-item">
          <span>Last Date:</span>
          <strong>{useFormatDate(selectedGovJob?.gov_job_last_start)}</strong>
        </div>
        {selectedGovJob?.gov_job_exam_date && (
          <div className="date-item">
            <span>Exam Date:</span>
            <strong>{useFormatDate(selectedGovJob?.gov_job_exam_date)}</strong>
          </div>
        )}
      </div>

      <div className="job-content">
        <div className="quick-view">
          <h3>Quick View</h3>
          <p>{selectedGovJob?.gov_quick_view}</p>
        </div>

        <div className="description">
          <h3>Detailed Description</h3>
          <p>{selectedGovJob?.gov_detailed_description}</p>
        </div>
      </div>

      <div className="job-fees">
        <h3>Application Fees</h3>
        <div className="fee-grid">
          <div className="fee-item">
            <span>General:</span>
            <strong>₹{selectedGovJob?.gov_general_fee}</strong>
          </div>
          <div className="fee-item">
            <span>Female:</span>
            <strong>₹{selectedGovJob?.gov_female_fee}</strong>
          </div>
          <div className="fee-item">
            <span>OBC:</span>
            <strong>₹{selectedGovJob?.gov_obc_fee}</strong>
          </div>
          <div className="fee-item">
            <span>SC/ST:</span>
            <strong>₹{selectedGovJob?.gov_scst_fee}</strong>
          </div>
        </div>
      </div>

      <div className="job-age">
        <h3>Age Requirements</h3>
        <div className="age-grid">
          <div className="age-section">
            <h4>Male Candidates</h4>
            <div className="age-range">
              <span>Minimum: {selectedGovJob?.gov_male_min_age} years</span>
              <span>Maximum: {selectedGovJob?.gov_male_max_age} years</span>
            </div>
          </div>
          <div className="age-section">
            <h4>Female Candidates</h4>
            <div className="age-range">
              <span>Minimum: {selectedGovJob?.gov_female_min_age} years</span>
              <span>Maximum: {selectedGovJob?.gov_female_max_age} years</span>
            </div>
          </div>
        </div>
      </div>

      <div className="job-links">
        <div className="link-item">
          <a href={selectedGovJob?.gov_apply_link} target="_blank" rel="noopener noreferrer" className="apply-btn">
            Apply Now
          </a>
        </div>
        <div className="link-item">
          <a href={selectedGovJob?.gov_notification_link} target="_blank" rel="noopener noreferrer" className="notification-link">
            View Official Notification
          </a>
        </div>
      </div>
    </div>
  )
}

export default GovJobCard