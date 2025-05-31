import React from 'react'
import '../style/MyJobs.scss'
import { useNavigate } from 'react-router-dom';

function MyJobs() {
  // Sample data - replace with your actual data

  const navigate = useNavigate();

  const jobs = [
    {
      company: "TechCorp",
      position: "Frontend Developer",
      postedDate: "30 May, 2025",
      endDate: "30 June, 2025",
      applicants: 10,
      status: "Active",
      notifications: 5
    },
    {
      company: "DesignHub",
      position: "UI/UX Designer",
      postedDate: "28 May, 2025",
      endDate: "28 June, 2025",
      applicants: 8,
      status: "Pending",
      notifications: 3
    },
    {
      company: "DataSystems",
      position: "Backend Engineer",
      postedDate: "25 May, 2025",
      endDate: "25 June, 2025",
      applicants: 15,
      status: "Active",
      notifications: 7
    },
    {
      company: "MobileFirst",
      position: "React Native Dev",
      postedDate: "20 May, 2025",
      endDate: "20 June, 2025",
      applicants: 6,
      status: "Active",
      notifications: 2
    }
  ];

  return (
    <div className='myjobs_container'>
      {jobs.map((job, index) => (
        <div className="posted_job_card" key={index} onClick={()=>navigate('/job/my-jobs/view')} >
          <div className="posted_job_details">
            <h2>{job.company}</h2>
            <h3>{job.position}</h3>
          </div>
          <div className="about_posted_job">
            <div className="abj">
              <p>Posted date: <span>{job.postedDate}</span></p>
              <p>Applied till: <span>{job.endDate}</span></p>
              <p>Applied by: <span>{job.applicants} candidates</span></p>
            </div>
            <div className="status_posted_job">
              <small className={`badge ${job.status.toLowerCase()}`}>
                {job.status}
              </small>
              <p>🔔<span>{job.notifications}</span></p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MyJobs