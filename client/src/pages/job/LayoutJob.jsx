import React, { useState, useEffect } from 'react';
import './style/LayoutJob.scss';
import SKILZYYNAME from '/homeComponent/SKILZYYNAME.png';
import { getCapName } from '../../utils/getCapName';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function LayoutJob() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(store => store.auth);
  const [dialogue, setDialogue] = useState(false);

  const navList = [
    { text: 'Home', url: '' },
    { text: 'Jobs', url: '' },
    { text: 'Accounts', url: '' },
  ];

  const jobNavList = [
    { icon: '🎓', jobTitle: 'gov', url: '' },
    { icon: '🎓', jobTitle: '10th', url: '' },
    { icon: '📚', jobTitle: '12th', url: '' },
    { icon: '👨‍🎓', jobTitle: 'Graduate', url: '' },
    { icon: '💻', jobTitle: 'IT', url: '' },
    { icon: '📊', jobTitle: 'B.Com', url: '' },
    { icon: '✍️', jobTitle: 'Editor', url: '' },
    { icon: '🎨', jobTitle: 'Design', url: '' },
    { icon: '📱', jobTitle: 'Marketing', url: '' },
  ];

  const navigateHandler = (text) => {
    if (text === 'Home') {

      navigate('/');

    } else if (text === 'Create') {
      
      setDialogue(false); // Close dropdown when navigating
      navigate('create');
    
    } else if (text === 'Jobs') {
    
      navigate('');
    
    } else if (text === 'Accounts') {
    
      setDialogue(!dialogue); // Toggle dropdown
    
    } else if (text === 'MyAccount') {
    
      setDialogue(false);
      navigate(`/profile/${user?.username}`);
    
    } else if (text === 'Messages') {
    
      setDialogue(false);
      navigate(`/message`);
    
    } else if (text === 'MyJobs') {
    
      setDialogue(false);
      navigate(`/job/my-jobs`);
    
    } else if(text === 'AppliedJobs' ){
      setDialogue(false)
      navigate('/job/applied')
    }
  };

  // Close dropdown when clicking anywhere in the document
  useEffect(() => {
    const closeDropdown = () => setDialogue(false);
    
    // Only add the event listener if dropdown is open
    if (dialogue) {
      document.addEventListener('click', closeDropdown);
    }
    
    // Clean up by removing the event listener
    return () => {
      document.removeEventListener('click', closeDropdown);
    };
  }, [dialogue]);


  const jobNavHandler = (text)=>{
    if(text === 'gov'){
      navigate(`gov`)
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
              <li 
                key={i} 
                onClick={(e) => {
                  e.stopPropagation(); // Prevent event from reaching document
                  navigateHandler(n.text);
                }}
              >
                {getCapName(n.text)}
              </li>
            ))}
          </ul>
          {dialogue && (
            <div 
              className="account_dropdown"
              onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing
            >
              <ul className='dropdownmenu'>
                <li onClick={() => navigateHandler('MyAccount')}>My Account</li>
                <li onClick={() => navigateHandler('Messages')}>Messages</li>
                <li onClick={() => navigateHandler('AppliedJobs')}>Applied Jobs</li>
                <li onClick={() => navigateHandler('MyJobs')}>Created Jobs</li>
                <li onClick={() => navigateHandler('Create')}>Create +</li>
              </ul>
            </div>
          )}
        </nav>
      </header>

      <div className="job_navigation">
        {jobNavList.map((jb, i) => (
          <div className="job_nav_card" key={i} onClick={()=>jobNavHandler(jb.jobTitle)} >
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
  );
}

export default LayoutJob;