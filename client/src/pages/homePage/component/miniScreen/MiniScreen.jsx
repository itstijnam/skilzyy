import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MiniScreen.scss'

function MiniScreen({ freelancer }) {
    const navigate = useNavigate();
    // Access the score from the first rating object
    const score = freelancer?.ratings?.[0]?.score;

    return (
        <div className="userMiniInfoDisplay"
            onClick={()=>{navigate(`/profile/${freelancer.username}`)}}
        >
            <div className="leftContainer">
                <div className="userImage">
                    <img src={freelancer?.profilePicture? `${freelancer.profilePicture}` : "/homeComponent/blankProfile.png"} alt="" />
                </div>
                <div className="userNameService">
                    <div className="name">{freelancer?.person_name}</div>
                    <p>{freelancer?.city}</p>
                </div>
            </div>
            <div className="userRatings">
                <div className="starImage">
                    <img src="/homeComponent/star.png" alt="" />
                </div>
                {/* Display the score here */}
                <p>{score ? score : 'N/A'}</p>
            </div>
        </div>
    );
}

export default MiniScreen;
