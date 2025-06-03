import React from 'react'
import '../style/MyJobs.scss'
import { useNavigate, useSearchParams } from 'react-router-dom';
import fetchAllCreatedJobs from '../../../../hooks/jobsHooks/fetchAllCreatedJobs';
import { useSelector } from 'react-redux';
import useFormatDate from '../../../utils/useFormatDate';

function MyJobs() {
  // Sample data - replace with your actual data
  fetchAllCreatedJobs()
  const navigate = useNavigate();

  const { currentUserCreatedJobs } = useSelector(store => store.job)

  console.log('currentUserCreatedJobs: ', currentUserCreatedJobs)

  const jobsLength = () => {
    return currentUserCreatedJobs.reduce((total, job) => {
      return total + (job.applicants?.length || 0);
    }, 0);
  };

  return (
    <div className='myjobs_container'>
      {currentUserCreatedJobs?.map((job, index) => (
        <div className="posted_job_card" key={index} onClick={() => navigate('/job/my-jobs/view')} >
          <div className="posted_job_details">
            <h2>{job?.company_name}</h2>
            <h3>{job?.post_name}</h3>
          </div>
          <div className="about_posted_job">
            <div className="abj">
              <p>Posted date: <span>{useFormatDate(job?.posted_date)
              }</span></p>
              <p>Applied till: <span>{useFormatDate(job?.last_date)}</span></p>
              <p>Applied by: <span>{job.applicants} candidates</span></p>
            </div>
            <div className="status_posted_job">
              <small className={`badge ${job?.job_status.toLowerCase()}`}>
                {job?.job_status}
              </small>
              <p>🔔<span>{jobsLength()}</span></p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MyJobs