// LayoutJob.jsx
import React from 'react'
import './style/LayoutJob.scss'
import SKILZYYNAME from '/homeComponent/SKILZYYNAME.png'
import { getCapName } from '../../utils/getCapName'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

function LayoutJob() {

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const navList = [
    { text: 'Home', url: '' },
    { text: 'About', url: '' },
    { text: 'Account', url: '' },
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

  const navigateHandler = (text)=>{
    if(text === 'Home'){
      navigate('/')
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
              <li key={i}  onClick={()=>navigateHandler(n.text)} >{getCapName(n.text)}</li>
            ))}
          </ul>
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
        <Outlet/>
      </section>
    </div>
  )
}

export default LayoutJob