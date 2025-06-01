import React from 'react'
import '../style/ApplicantJobCard.scss'
import { getCapName } from '../../../utils/getCapName'
import { FaBriefcase, FaMapMarkerAlt, FaUser } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function ApplicantJobCard() {

    const navigate = useNavigate();
    const {user} = useSelector(store => store.auth)

    const jobData = {
        company: "Tech Innovations Inc",
        position: "Frontend Developer",
        status: "Active",
        applicants: 2,
        candidates: [
            {
                profilePicture: '',
                name: 'Manjit Singh',
                location: 'Delhi',
                status: 'pending' // 'hired', 'rejected', or 'pending'
            },
            {
                profilePicture: '',
                name: 'Priya Sharma',
                location: 'Bangalore',
                status: 'pending'
            }
        ]
    }

    const handleAction = (action, candidateName) => {
        console.log(`${action} ${candidateName}`);
        // Add your API call or state management here
    }

    return (
        <div className='AJC_container'>
            <div className="AJC_details">
                <div className="_post_name">
                    <h2><FaBriefcase /> {jobData.company}</h2>
                    <h3>{getCapName(jobData.position)}</h3>
                </div>
                <div className={`badge ${jobData.status.toLowerCase()}`}>
                    {jobData.status}
                </div>
                <div className="AJC_applied_by">
                    <FaUser /> {jobData.applicants}
                </div>
            </div>
            
            <hr className="divider" />
            
            <div className="applied_by">
                {jobData.candidates.map((candidate, index) => (
                    <div className="candidated_card" key={index} onClick={()=>navigate(`/profile/${user?.username}`)}>
                        <div className="_candidate_profile">
                            <div className="candidate_image">
                                {candidate.profilePicture ? (
                                    <img src={candidate.profilePicture} alt={candidate.name} />
                                ) : (
                                    <div className="avatar_placeholder">
                                        {candidate.name.charAt(0)}
                                    </div>
                                )}
                            </div>
                            <div className="candidate_info">
                                <h1>{getCapName(candidate.name)}</h1>
                                <h2><FaMapMarkerAlt /> {candidate.location}</h2>
                            </div>
                        </div>
                        <div className="action_btn">
                            <button 
                                className={`hire_btn ${candidate.status === 'hired' ? 'active' : ''}`}
                                onClick={() => handleAction('hired', candidate.name)}
                            >
                                Hired
                            </button>
                            <button 
                                className={`reject_btn ${candidate.status === 'rejected' ? 'active' : ''}`}
                                onClick={() => handleAction('rejected', candidate.name)}
                            >
                                Rejected
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ApplicantJobCard