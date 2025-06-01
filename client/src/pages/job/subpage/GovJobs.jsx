import React from 'react'
import '../style/GovJobs.scss'
import { useNavigate } from 'react-router-dom'

function GovJobs() {
  const fakeGovJobs = [
    {
      id: 1,
      post: 'Indian Army TGC',
      lastDate: '12 June 2025',
      examDate: '15 July 2025',
      vacancies: 120,
      organization: 'Indian Army',
      applyLink: 'https://indianarmy.nic.in'
    },
    {
      id: 2,
      post: 'SSC CHSL',
      lastDate: '30 May 2025',
      examDate: '20 August 2025',
      vacancies: 4500,
      organization: 'Staff Selection Commission',
      applyLink: 'https://ssc.nic.in'
    },
    {
      id: 3,
      post: 'UPSC Civil Services',
      lastDate: '05 March 2025',
      examDate: '31 May 2025',
      vacancies: 1000,
      organization: 'Union Public Service Commission',
      applyLink: 'https://upsc.gov.in'
    },
    {
      id: 4,
      post: 'Railway Recruitment Board',
      lastDate: '15 April 2025',
      examDate: '10 June 2025',
      vacancies: 35000,
      organization: 'Indian Railways',
      applyLink: 'https://rrb.gov.in'
    }
  ]

  const navigate = useNavigate()

  return (
    <div className='gov_jobs_container'>
      <h1 className="gov_jobs_heading">Latest Government Jobs</h1>
      
      <div className="gov_jobs_list">
        {fakeGovJobs.map((job) => (
          <div className="gov_job_card" key={job.id} onClick={()=>navigate(`/job/gov/sdfasd`)}>
            <div className="job_main_info">
              <h2>{job.post}</h2>
              {/* <p className="organization">{job.organization}</p> */}
            </div>
            
            <div className="job_details">
              {/* <div className="detail_item">
                <span>Vacancies:</span>
                <strong>{job.vacancies.toLocaleString()}</strong>
              </div> */}
              <div className="detail_item">
                <span>Last Date:</span>
                <strong>{job.lastDate}</strong>
              </div>
              <div className="detail_item">
                <span>Exam Date:</span>
                <strong>{job.examDate}</strong>
              </div>
            </div>
            
            <div className="gov_action_btn">
              <a 
                href={job.applyLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="apply_btn"
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