import React from 'react'
import '../style/ApplicantJobCard.scss'
import { getCapName } from '../../../utils/getCapName'
import { FaBriefcase, FaMapMarkerAlt, FaUser } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { baseUrl } from '../../../utils/baseUrl'

function ApplicantJobCard() {

    const navigate = useNavigate();
    const {selcetedFromMyCreatedJob} = useSelector(store => store.job)

    // console.log('setSelcetedFromMyCreatedJob', selcetedFromMyCreatedJob)

    const handleAction = async (jobId, userId, status) => {
        try {
            const res = await axios.put(`${baseUrl}/api/job/update-applicants-status/${jobId}/${userId}`, {status}, {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true
            })

            if(res.data.success){
                console.log(res.data.message)
            }
        } catch (error) {
            
        }
    }

    return (
        <div className='AJC_container'>
            <div className="AJC_details">
                <div className="_post_name">
                    <h2><FaBriefcase /> {selcetedFromMyCreatedJob?.company_name}</h2>
                    <h3>{getCapName(selcetedFromMyCreatedJob?.post_name)}</h3>
                </div>
                <div className={`badge ${selcetedFromMyCreatedJob?.job_status.toLowerCase()}`}>
                    {selcetedFromMyCreatedJob?.job_status}
                </div>
                <div className="AJC_applied_by">
                    <FaUser /> {selcetedFromMyCreatedJob?.applicants?.length || 0}
                </div>
            </div>
            
            <hr className="divider" />
            
            <div className="applied_by">
                {selcetedFromMyCreatedJob?.applicants?.map((candidate, index) => (
                    <div className="candidated_card" key={index} onClick={()=>navigate(`/profile/${candidate?.user?.username}`)}>
                        <div className="_candidate_profile">
                            <div className="candidate_image">
                                {candidate?.user?.profilePicture ? (
                                    <img src={candidate?.user?.profilePicture} alt={candidate.name} />
                                ) : (
                                    <div className="avatar_placeholder">
                                        {candidate?.user?.person_name?.charAt(0)}
                                    </div>
                                )}
                            </div>
                            <div className="candidate_info">
                                <h1>{getCapName(candidate?.user?.person_name)}</h1>
                                <h2><FaMapMarkerAlt /> {candidate?.user?.state}</h2>
                            </div>
                        </div>
                        <div className="action_btn">
                            <button 
                                className={`hire_btn ${candidate.status === 'hired' ? 'active' : ''}`}
                                onClick={() => handleAction(selcetedFromMyCreatedJob?._id, candidate?.user?._id, 'hired')}
                            >
                                Hire
                            </button>
                            <button 
                                className={`reject_btn ${candidate.status === 'rejected' ? 'active' : ''}`}
                                onClick={() => handleAction(selcetedFromMyCreatedJob?._id, candidate?.user?._id , 'rejected')}
                            >
                                Reject
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ApplicantJobCard