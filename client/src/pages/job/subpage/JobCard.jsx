import React from 'react'
import '../style/JobCard.scss';
import { useParams } from 'react-router-dom'

function JobCard() {
  const params = useParams()

  const job = {
    about_job: `Hey everyone, I'm SKILZYY --- a platform built to empower the next generation.
    I'm working on something close to the hearts of students: helping you find meaningful internships and jobs while still in college.`,
    job_image: 'https://media.licdn.com/dms/image/v2/D4E03AQF46wmGiLHlbA/profile-displayphoto-shrink_400_400/B4EZcNR5SbGQAk-/0/1748274485021?e=1753920000&v=beta&t=WZvL7QEi5xhL3cO7kjZbrTaFXme6JczGj_0w9ZdQDbk',
    post: 'Frontend Developer',
    company: 'Skilzyy',
    vacancy: 10,
    date: '12 June 2025',
    experience: '0-2 yrs',
    applied: 124,
    description: 'We are looking for a skilled Frontend Developer with experience in React.js to join our growing team. You will be responsible for building user interfaces and implementing features.',
  }

  return (
    <div className='jobcard' >
      <div className="job_character">
        <div className="job_char">
          <div className="job_card_image">
            <img src={job.job_image} alt={job.company} />
          </div>
          <div className="job_position">
            <h2>{job.company}</h2>
            <h4>{job.post}</h4>
          </div>
        </div>
        <div className="about_job">
          <h2 className="heading">About</h2>
          <pre>
            {job.about_job}
          </pre>
        </div>
      </div>
      <div className="job_description_container">
        <div className="job_quickdetails">
          <div className="job_quick_right_top">
            <p>Experience: <span>{job.experience}</span></p>
            <p>Date: <span>{job.date}</span></p>
            <p className='job_card_vacancy'>Vacancy: <span>{job.vacancy}</span></p>
            <p className='job_card_vacancy'>Compensation: <span>10k</span></p>
            <p className='job_card_applied'>Applied: <span>{job.applied}</span></p>
          </div>
          <div className="job_action_btn">
            <button>Apply</button>
          </div>
        </div> 
        <div className="job_description">
          <h3>Job Description</h3>
          <pre>{job.description}</pre>
        </div>
      </div>
    </div>
  )
}

export default JobCard