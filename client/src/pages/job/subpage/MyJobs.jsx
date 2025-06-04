import React from 'react'
import '../style/MyJobs.scss'
import { useNavigate, useSearchParams } from 'react-router-dom';
import fetchAllCreatedJobs from '../../../../hooks/jobsHooks/fetchAllCreatedJobs';
import { useDispatch, useSelector } from 'react-redux';
import useFormatDate from '../../../utils/useFormatDate';
import { setSelcetedFromMyCreatedJob } from '../../../../redux/jobSlice';

function MyJobs() {
  
  fetchAllCreatedJobs()
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentUserCreatedJobs } = useSelector(store => store.job)

  return (
    <div className='myjobs_container'>
      {currentUserCreatedJobs?.map((job, index) => (
        <div className="posted_job_card" key={job?._id} onClick={() => {
          navigate('/job/my-jobs/view')
          dispatch(setSelcetedFromMyCreatedJob(job))
          }} >
          <div className="posted_job_details">
            <h2>{job?.company_name}</h2>
            <h3>{job?.post_name}</h3>
          </div>
          <div className="about_posted_job">
            <div className="abj">
              <p>Posted date: <span>{useFormatDate(job?.posted_date)
              }</span></p>
              <p>Applied till: <span>{useFormatDate(job?.last_date)}</span></p>
              <p>Applied by: <span>{job.applicants?.length || 0} candidates</span></p>
            </div>
            <div className="status_posted_job">
              <small className={`badge ${job?.job_status.toLowerCase()}`}>
                {job?.job_status}
              </small>
              <p>🔔<span>{job.applicants?.length || 0}</span></p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MyJobs