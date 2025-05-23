import React from 'react'
import './Bubble.scss'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Bubble() {

    const navigate = useNavigate();
    const { freelancers } = useSelector((store) => store.freelancer);

    return (
        <div className='bubble'>
            <div className='one'>
                <h1>Choose Randomly Freelancers</h1>
                <p>Everyone deserves an opportunity to showcase their potential; let their work and reviews speak louder than preconceived notions. True talent and dedication reveal themselves through actions and results, not assumptions</p>
            </div>
            <div className='two'>
                <div className="horizontalScroll">
                    {freelancers?.map((f, i) => (
                        <div className="circle C1" key={i} onClick={()=>navigate(`/profile/${f?.username}`)} >
                            <img src={f.profilePicture ? f.profilePicture : "/homeComponent/blankProfile.png"} alt="" />
                        </div>
                    ))}
                </div>
                    
            </div>
            
        </div>
    )
}

export default Bubble