// Jobs.jsx
import React, { useEffect, useState } from 'react'
import Add from './Add'
import '../style/Jobs.scss'
import wipro from '../components/images/wipro.jpg'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import useGetAllLiveJobs from '../../../../hooks/jobsHooks/useGetAllLiveJobs'
import { getCapName } from '../../../utils/getCapName'
import formatToShortDate from '../../../utils/useFormatShortDate'
import { setSelectedJob } from '../../../../redux/jobSlice'
import axios from 'axios'
import { baseUrl } from '../../../utils/baseUrl'

function Jobs() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    useGetAllLiveJobs();

    const { allUsersLiveJobs } = useSelector(store => store.admin);
    const {user} = useSelector(store => store.auth)
    const [apiMessage, setApiMessage] = useState('')
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
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

    return (
        <div>
            <section className="ads_section">
                {/* <Add /> */}
            </section>
            <div className="job_container">
                <div className="job_box">
                    {/* Example Job Card 1 */}

                    {allUsersLiveJobs.map((job, idx) => (
                        <div className="job_card" key={job?._id} >
                            <div className='job_desc' onClick={() => {
                                navigate(`/job/${job?._id}`)
                                dispatch(setSelectedJob(job))
                            }}>
                                <div className="job_card_image">
                                    <img src={job?.created_by?.profilePicture} alt={job?.company_name} />
                                </div>
                                <div className='job_post_heading'>
                                    <div>
                                        <h2>{getCapName(job?.post_name)}</h2>
                                        <h3>{getCapName(job?.company_name)}</h3>
                                    </div>
                                    <div className="job_card_quick_details">
                                        <p>Experience: <span>{job?.experience_level} yr(s)</span></p>
                                        <p>Date: <span> {formatToShortDate(job?.last_date)}</span></p>
                                        <p className='job_card_vacancy' >Vacancy: <span>{job?.vacancy}</span></p>
                                        {/* <p className='job_card_applied'>Applied: <span>{job?.applicants?.length}</span></p> */}
                                    </div>
                                </div>
                            </div>{apiMessage && <small style={{color: 'green'}} >{apiMessage}</small> }
                            <div className="job_card_apply_action">
                                { job?.applicants?.find(obj => obj.user === user?._id) ?
                                
                                <button onClick={() => jobAppliedHandler(job?._id)} >Applied</button> :
                                <button onClick={() => jobAppliedHandler(job?._id)} >Apply</button>
                            }
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default Jobs