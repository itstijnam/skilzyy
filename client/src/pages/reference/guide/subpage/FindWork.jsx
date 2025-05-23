import React from 'react';
import '../styles/FindWork.scss';
import Header from '../../../messagePage/components/Header';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import EDITPIC from '../assets/edit.png';
import PROFILE from '../assets/profile.png';
import POST from '../assets/post.png';
import SKILZYYIMAGE from '../assets/skilzyypost.png';
import MESSAGE from '../assets/message.png';

function FindWork() {
  const navigate = useNavigate();
  const { user } = useSelector(store => store.auth);

  const steps = [
    {
      title: '1. Edit Your Profile',
      text: `After logging in, toggle “I want to be freelancer” in your profile. 
             This ensures your services appear in the public catalog.`,
      img: EDITPIC,
    },
    {
      title: '2. Manage Your Service Status',
      text: `Go online or offline at any time from your profile. 
             When offline, your services are hidden from clients.`,
      img: PROFILE,
    },
    {
      title: '3. Post Your Work',
      text: `Share your project: upload an image, add a description, set your price.`,
      img: POST,
    },
    {
      title: '4. Showcase on Skilzyy',
      text: `All active posts live here your catalog of work attracts new clients automatically.`,
      img: SKILZYYIMAGE,
    },
    {
      title: '5. Connect via Messages',
      text: `Use our messenger to negotiate, ask questions, and keep personal info private.`,
      img: MESSAGE,
    },
  ];

  return (
    <div className="findwork">
      <Header />

      <nav className="find_work_navigation">
        <div className="backArrowButton" onClick={() => navigate(-1)}>⮜</div>
        <div className="navList">
          <ul >
            <li onClick={() => navigate('/')}>Home</li>
            <li onClick={() => navigate('/f')}>Skilzyy</li>
            <li onClick={() => navigate('/contact')}>Contact</li>
            {user
              ? <li onClick={() => navigate(`/profile/${user.username}`)}>My Account</li>
              : <li onClick={() => navigate('/auth')}>Join</li>
            }
          </ul>
        </div>
      </nav>

      <section className="steps">
        {steps.map((step, i) => (
          <div className="step-card" key={i}>
            <div className="step-text">
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
            <div className="step-img">
              <img src={step.img} alt={step.title} />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default FindWork;
