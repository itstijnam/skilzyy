import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useFormatDate from '../../../utils/useFormatDate';
import '../style/PendingJobs.scss'
import fetchAllPendingJobs from '../../../../hooks/jobsHooks/fetchAllPendingJobs';
import axios from 'axios';
import { baseUrl } from '../../../utils/baseUrl';

function PendingJobs() {

    fetchAllPendingJobs()
    const navigate = useNavigate();

    const { allUsersPendingJobs } = useSelector(store => store.admin)

    console.log('allUsersPendingJobs: ', allUsersPendingJobs)

    const updateJobStatus = async (id, status)=>{
        try {
            const res = await axios.put(`${baseUrl}/api/job/update-job-pendinglive-status/${id}`, { job_status: status}, {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true
            });

            if(res.data.success){
                console.log(res.data.message)
            }
        } catch (error) {
            
        }
    }

    return (
        <div className='myjobs_container'>
            {allUsersPendingJobs?.map((job, index) => (
                <div className="posted_job_card" key={index} onClick={() => navigate('/job/jobId')} >
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
                        </div>
                    </div>
                        <div className="admin_action_btn">
                            <button className='action_live' onClick={()=>updateJobStatus(job?._id, 'live')} >Live</button>
                            <button className='action_reject' onClick={()=>updateJobStatus(job?._id, 'closed')}>Reject</button>
                        </div>
                </div>
            ))}
        </div>
    )
}

export default PendingJobs