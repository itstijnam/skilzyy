import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAuthUser } from '../../../../redux/authSlice';
import axios from 'axios';
import { baseUrl } from '../../../utils/baseUrl';
import SKILZYY from '/homeComponent/SKILZYY.png'


function HeaderShown() {
  const [miniPop, setMiniPop] = useState(false);
  const { user } = useSelector(store => store.auth);
  const miniPopUpHandler = () => {
    setMiniPop(!miniPop);
  }

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/freelance/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setAuthUser(null));
        // setMessage(res.data.message);
        navigate('/');
      }
    } catch (error) {

    }
  }

  return (
    <>
      <div className="GPleft">
        <div className="GPCompLogo">
          <img src={SKILZYY} alt="" />
        </div>
        <p>Skillzy</p>
      </div>
      <div className="GPRight">
        <ol>
          <li onClick={() => navigate('/')} >Home</li>
          <li onClick={() => navigate('/f')} >Skilzyy</li>
          {/* <li>Jobs</li>
            <li>About</li> */}
          <li onClick={() => navigate('/contact')} >Contact</li>
        </ol>
        {user ? 
          <div className='GPRUserInfo' onClick={miniPopUpHandler}>
            <div className="GPRUImage" >
              <img src={user ? `${user?.profilePicture}` : "/homeComponent/blankProfile.png"} alt="" />
            </div>
            {
              miniPop &&
              <div className='GPRUserInfoBox'>
                <ul>
                  <li onClick={() => navigate(`/profile/${user?.username}`)} >MyAccount</li>
                  {/* <li>Messages</li>
                    <li>Settings</li> */}
                  <li onClick={logoutHandler} >Logout</li>
                </ul>
              </div>
            }
          </div> :
          <a style={{cursor: 'pointer'}} onClick={() => navigate('/auth')} >Join</a>
        }
      </div>
    </>
  )
}

export default HeaderShown