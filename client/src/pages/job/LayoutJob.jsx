// LayoutJob.jsx
import React, { useState } from 'react'
import './style/LayoutJob.scss'
import SKILZYYNAME from '/homeComponent/SKILZYYNAME.png'
import { getCapName } from '../../utils/getCapName'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

function LayoutJob() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {user} = useSelector(store => store.auth)
  console.log(user)

  const [dialogue, setDialogue] = useState(false)

  const navList = [
    { text: 'Home', url: '' },
    { text: 'Jobs', url: '' },
    { text: 'Accounts', url: '' },
  ]

  const jobNavList = [
    { icon: '🎓', jobTitle: '10th', url: '' },
    { icon: '📚', jobTitle: '12th', url: '' },
    { icon: '👨‍🎓', jobTitle: 'Graduate', url: '' },
    { icon: '💻', jobTitle: 'IT', url: '' },
    { icon: '📊', jobTitle: 'B.Com', url: '' },
    { icon: '✍️', jobTitle: 'Editor', url: '' },
    { icon: '🎨', jobTitle: 'Design', url: '' },
    { icon: '📱', jobTitle: 'Marketing', url: '' },
  ]

  const navigateHandler = (text) => {
    
    if (text === 'Home') {
      navigate('/')
    } else if (text === 'Create') {
      setDialogue(!dialogue)
      navigate('create')
    } else if (text === 'Jobs') {
      navigate('')
    } else if (text === 'Accounts') {
      setDialogue(!dialogue)
    } else if (text === 'MyAccount') {
      setDialogue(!dialogue)
      navigate(`/profile/${user?.username}`)
    } else if (text === 'Messages') {
      setDialogue(!dialogue)
      navigate(`/message`)
    }else if (text === 'MyJobs') {
      setDialogue(!dialogue)
      navigate(`/job/my-jobs`)
    }
  }

  return (
    <div className='Layout'>
      <header className="layout_header">
        <div className="skilzyy_logo">
          <img src={SKILZYYNAME} alt="Skilzyy" />
        </div>
        <nav className="skilzyy_navigation">
          <ul>
            {navList.map((n, i) => (
              <li key={i} onClick={() => navigateHandler(n.text)} >{getCapName(n.text)}</li>
            ))}
          </ul>
          {dialogue &&
            <div className="account_dropdown">
              <ul className='dropdownmenu'>
                <li onClick={()=>navigateHandler('MyAccount')} >My Account</li>
                <li onClick={()=>navigateHandler('Messages')} >Messages</li>
                <li onClick={()=>navigateHandler('AppliedJobs')} >Applied Jobs</li>
                <li onClick={()=>navigateHandler('MyJobs')} >My Jobs</li>
                <li onClick={()=>navigateHandler('Create')} >Create +</li>
              </ul>
            </div>
          }


        </nav>
      </header>

      <div className="job_navigation">
        {jobNavList.map((jb, i) => (
          <div className="job_nav_card" key={i}>
            <div className="job_class_icon">
              {jb.icon}
            </div>
            <p>{getCapName(jb.jobTitle)}</p>
          </div>
        ))}
      </div>

      <section>
        <Outlet />
      </section>
    </div>
  )
}

export default LayoutJob