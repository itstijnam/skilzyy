import React, { useEffect, useState } from 'react'
import '../style/JobCard.scss';
import { useSelector } from 'react-redux';
import useFormatDate from '../../../utils/useFormatDate';
import axios from 'axios';
import { baseUrl } from '../../../utils/baseUrl';

function JobCard() {
  const { selectedJob } = useSelector(store => store.job);
  const { user } = useSelector(store => store.auth);



  const [apiMessage, setApiMessage] = useState('')
  const [genNoti, setGenNoti] = useState(true);

  const jobAppliedHandler = async (id) => {
    try {
      const res = await axios.put(`${baseUrl}/api/job/apply/${id}`, { status: 'applied' }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      if (res.data.success) {
        setApiMessage(res.data.message)
      }
    } catch (error) {

    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setApiMessage('');
      setGenNoti(false)
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);


  return (
    <div className='jobcard' >
      <div className="job_character">
        <div className="job_char">
          <div className="job_card_image">
            <img src={selectedJob?.created_by?.profilePicture} alt={selectedJob?.company_name} />
          </div>
          <div className="job_position">
            <h2>{selectedJob?.company_name}</h2>
            <h4>{selectedJob?.post_name}</h4>
          </div>
        </div>
        <div className="about_job">
          <h2 className="heading">About</h2>
          <pre>
            {selectedJob?.job_about}
          </pre>
        </div>
      </div>
      <div className="job_description_container">
        <div className="job_quickdetails">
          <div className="job_quick_right_top">

            <p>Experience: <span>{selectedJob?.experience_level} yr(s)</span></p>
            <p>Date: <span>{useFormatDate(selectedJob?.last_date)}</span></p>
            <p className='job_card_vacancy'>Vacancy: <span>{selectedJob?.vacancy}</span></p>
            <p className='job_card_vacancy'>Compensation: <span>{selectedJob?.compensation}</span></p>
            <p className='job_card_applied'>Applied: <span>{selectedJob?.applicants?.length}</span></p>
          </div>

          {genNoti && <p style={{ color: 'red', transition: '0.2s' }}>0 means, company didnt provide details about that field.</p>}

          <div className="job_action_btn">
            {apiMessage && <small style={{ color: 'green' }}>{apiMessage}</small>}

            {selectedJob?.job_refer_link ? (
              <a
                href={selectedJob.job_refer_link}
                target="_blank"
                rel="noopener noreferrer"
                className="visit-btn"
              >
                Visit
              </a>
            ) : (
              selectedJob?.applicants?.find(obj => obj.user === user?._id) ?
                <button onClick={() => jobAppliedHandler(selectedJob?._id)} >Applied</button> :
                <button onClick={() => jobAppliedHandler(selectedJob?._id)} >Apply</button>
            )}
          </div>

        </div>
        <div className="job_description">
          <h3>Job Description</h3>
          <pre>{selectedJob?.job_description}</pre>
        </div>
      </div>
    </div>
  )
}

export default JobCard