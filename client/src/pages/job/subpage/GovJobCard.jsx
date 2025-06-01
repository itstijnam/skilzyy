import React from 'react'
import '../style/GovJobCard.scss'

function GovJobCard({ job }) {
  // Sample data structure that matches your form fields
  const defaultJob = {
    post: 'Indian Army Technical Graduate Course',
    applicationStart: '2023-06-01',
    lastDate: '2023-07-15',
    examDate: '2023-08-20',
    quickView: 'Technical Graduate Course (TGC) entry for Engineering graduates to join Indian Army as Permanent Commission Officers.',
    description: 'The Indian Army is inviting applications from unmarried male Engineering graduates for 136th Technical Graduate Course (TGC). Selected candidates will undergo 1 year training at OTA Chennai before being commissioned as Lieutenants.',
    country: 'India',
    fees: {
      general: '200',
      female: '0',
      obc: '200',
      scst: '0'
    },
    age: {
      boysMin: '20',
      boysMax: '27',
      girlsMin: '20',
      girlsMax: '27'
    },
    applyLink: 'https://joinindianarmy.nic.in',
    notificationLink: 'https://indianarmy.nic.in/notifications/tgc-136',
    image: '/path/to/image.jpg'
  }

  const jobData = job || defaultJob

  return (
    <div className="gov-job-card">
      <div className="job-header">
        {jobData.image && (
          <div className="job-image">
            <img src={jobData.image} alt={jobData.post} />
          </div>
        )}
        <h2>{jobData.post}</h2>
        <p className="country">{jobData.country}</p>
      </div>

      <div className="job-dates">
        <div className="date-item">
          <span>Application Start:</span>
          <strong>{new Date(jobData.applicationStart).toLocaleDateString()}</strong>
        </div>
        <div className="date-item">
          <span>Last Date:</span>
          <strong>{new Date(jobData.lastDate).toLocaleDateString()}</strong>
        </div>
        {jobData.examDate && (
          <div className="date-item">
            <span>Exam Date:</span>
            <strong>{new Date(jobData.examDate).toLocaleDateString()}</strong>
          </div>
        )}
      </div>

      <div className="job-content">
        <div className="quick-view">
          <h3>Quick View</h3>
          <p>{jobData.quickView}</p>
        </div>

        <div className="description">
          <h3>Detailed Description</h3>
          <p>{jobData.description}</p>
        </div>
      </div>

      <div className="job-fees">
        <h3>Application Fees</h3>
        <div className="fee-grid">
          <div className="fee-item">
            <span>General:</span>
            <strong>₹{jobData.fees.general}</strong>
          </div>
          <div className="fee-item">
            <span>Female:</span>
            <strong>₹{jobData.fees.female}</strong>
          </div>
          <div className="fee-item">
            <span>OBC:</span>
            <strong>₹{jobData.fees.obc}</strong>
          </div>
          <div className="fee-item">
            <span>SC/ST:</span>
            <strong>₹{jobData.fees.scst}</strong>
          </div>
        </div>
      </div>

      <div className="job-age">
        <h3>Age Requirements</h3>
        <div className="age-grid">
          <div className="age-section">
            <h4>Male Candidates</h4>
            <div className="age-range">
              <span>Minimum: {jobData.age.boysMin} years</span>
              <span>Maximum: {jobData.age.boysMax} years</span>
            </div>
          </div>
          <div className="age-section">
            <h4>Female Candidates</h4>
            <div className="age-range">
              <span>Minimum: {jobData.age.girlsMin} years</span>
              <span>Maximum: {jobData.age.girlsMax} years</span>
            </div>
          </div>
        </div>
      </div>

      <div className="job-links">
        <div className="link-item">
          <a href={jobData.applyLink} target="_blank" rel="noopener noreferrer" className="apply-btn">
            Apply Now
          </a>
        </div>
        <div className="link-item">
          <a href={jobData.notificationLink} target="_blank" rel="noopener noreferrer" className="notification-link">
            View Official Notification
          </a>
        </div>
      </div>
    </div>
  )
}

export default GovJobCard