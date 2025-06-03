// Jobs.jsx
import React from 'react'
import Add from './Add'
import '../style/Jobs.scss'
import wipro from '../components/images/wipro.jpg'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import useGetAllLiveJobs from '../../../../hooks/jobsHooks/useGetAllLiveJobs'
import { getCapName } from '../../../utils/getCapName'
import formatToShortDate from '../../../utils/useFormatShortDate'

function Jobs() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    useGetAllLiveJobs();

    const { allUsersLiveJobs } = useSelector(store => store.admin);

    return (
        <div>
            <section className="ads_section">
                <Add />
            </section>
            <div className="job_container">
                <div className="job_box">
                    {/* Example Job Card 1 */}

                    {allUsersLiveJobs.map((job, idx) => (
                        <div className="job_card" onClick={() => navigate('/job/jobid') } key={job._id} >
                            <div className='job_desc'>
                                <div className="job_card_image">
                                    <img src={wipro} alt="Wipro" />
                                </div>
                                <div className='job_post_heading'>
                                    <div>
                                        <h2>{getCapName(job?.post_name)}</h2>
                                        <h3>{getCapName(job?.company_name)}</h3>
                                    </div>
                                    <div className="job_card_quick_details">
                                        <p>Experience: <span>{job?.experience_level} yr(s)</span></p>
                                        <p>Date: <span> { formatToShortDate(job?.last_date)}</span></p>
                                        <p className='job_card_vacancy' >Vacancy: <span>{job?.vacancy}</span></p>
                                        {/* <p className='job_card_applied'>Applied: <span>{job?.applicants?.length}</span></p> */}
                                    </div>
                                </div>
                            </div>
                            <div className="job_card_apply_action">
                                <button>Apply</button>
                            </div>
                        </div>
                    ))}

                    {/* <div className="job_card">
                        <div className='job_desc'>
                            <div className="job_card_image">
                                <img src={wipro} alt="Wipro" />
                            </div>
                            <div className='job_post_heading'>
                                <div>
                                    <h2>Frontend Developer</h2>
                                    <h3>Wipro Technologies</h3>
                                </div>
                                <div className="job_card_quick_details">
                                    <p>Experience: <span>0-2 yrs</span></p>
                                    <p>Date: <span>16/09/23</span></p>
                                    <p>Vacancy: <span>10</span></p>
                                    <p>Applied: <span>124</span></p>
                                </div>
                            </div>
                        </div>
                        <div className="job_card_apply_action">
                            <button>Apply Now</button>
                        </div>
                    </div> */}

                </div>
            </div>
        </div>
    )
}

export default Jobs