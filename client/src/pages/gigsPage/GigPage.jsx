import React, { useEffect, useState } from 'react'
import './scss/GigPage.scss'
import HeaderShown from './components/HeaderShown'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../utils/baseUrl';

function GigPage() {
  const {user} = useSelector(store => store.auth)
  const {selectedGig} = useSelector(store => store.freelancer);
  const [showMessageIsGigDelete, setShowMessageIsGigDelete] = useState('');
  const navigate = useNavigate();

  const isAuthor = user?._id === selectedGig?.author?._id

  const deleteHandler = async (gigId)=>{
    try {
        const res = await axios.delete(`${baseUrl}/api/gig/delete/${gigId}`, {withCredentials: true})
        if(res.data.success){
            setShowMessageIsGigDelete(res.data.message);
            navigate('/f');
        }
    } catch (error) {
        setShowMessageIsGigDelete(error?.response?.data?.message)
    }
}

  useEffect(()=>{
    if(!selectedGig){
      navigate('/f')
    }
  },[])
  return (
    <div className='gigPage'>
      <div className='GPHeader'>
        <HeaderShown/>
      </div>
      <div className="gig-container">
        <div className="gig-image">
          <img src={selectedGig ? selectedGig?.image : "/homeComponent/getIndependent1.png"} alt="" />
        </div>
        <div className="gig-detail">
          {showMessageIsGigDelete && <p style={{color: 'red', fontWeight: '600'}}>{showMessageIsGigDelete}</p> }
          <div className="gig-info">
            <h3>Name: <span>{selectedGig?.author?.person_name}</span></h3>
          </div>
          <div className="gig-info">
            <h3>Desc: <span>{selectedGig?.desc}</span></h3>
          </div>
          <div className="gig-info">
            <h3>Location: <span>{selectedGig?.author?.city?.charAt(0).toUpperCase() + selectedGig?.author?.city?.slice(1)}, {" "}
             {selectedGig?.author?.state?.charAt(0).toUpperCase() + selectedGig?.author?.state?.slice(1)}</span></h3>
          </div>
          {isAuthor ? 
          <>
          <button className='gigDelete' style={{backgroundColor: 'tan'}}
            onClick={()=>navigate(`/profile/${selectedGig?.author?.username}`)}
            >Visit Profile</button>
          <button className='gigDelete' onClick={()=>deleteHandler(selectedGig?._id)}>Delete</button>
          </>:
          <button className='gigDelete' style={{backgroundColor: 'tan'}}
          onClick={()=>navigate(`/profile/${selectedGig?.author?.username}`)}
          >Visit Profile</button>
        }
        <h3 className='back' onClick={()=>navigate(-1)} >↩</h3>
        </div>
      </div>
    </div>
  )
}

export default GigPage