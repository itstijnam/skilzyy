import React from 'react'
import '../style/GovJobs.scss'
import { useNavigate } from 'react-router-dom'
import fetchAllGovJobs from '../components/hooks/getAllGovJobs'
import { useDispatch, useSelector } from 'react-redux'
import formatToShortDate from '../../../utils/useFormatShortDate'
import { setSelectedGovJob } from '../../../../redux/govJobSlice'

function GovJobs() {
  fetchAllGovJobs()

  const {allgovjobs} = useSelector(store => store.gov)
  const navigate = useNavigate()
  const dispatch = useDispatch();

  return (
    <div className='gov_jobs_container'>
      <h1 className="gov_jobs_heading">Latest Government Jobs</h1>
      
      <div className="gov_jobs_list">
        {allgovjobs?.map((job) => (
          <div className="gov_job_card" key={job?._id} onClick={()=>{
            navigate(`/job/gov/view`);
            dispatch(setSelectedGovJob(job));
          }}>
            <div className="job_main_info">
              <h2>{job?.gov_job_post}</h2>
              {/* <p className="organization">{job.organization}</p> */}
            </div>
            
            <div className="job_details">
              {/* <div className="detail_item">
                <span>Vacancies:</span>
                <strong>{job.vacancies.toLocaleString()}</strong>
              </div> */}
              <div className="detail_item">
                <span>Apply Date:</span>
                <strong>{formatToShortDate(job?.gov_job_appl_start)}</strong>
              </div>
              <div className="detail_item">
                <span>Last Date:</span>
                <strong>{formatToShortDate(job?.gov_job_last_start)}</strong>
              </div>
            </div>
            
            <div className="gov_action_btn">
              <a 
                href={job?.gov_apply_link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="apply_btn"
                onClick={(e) => e.stopPropagation()}
              >
                Apply Now
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GovJobs