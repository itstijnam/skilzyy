import React from 'react'
import '../styles/Hire.scss'
import FILTER from '../assets/filter.png'
import MESSAGES from '../assets/messages.png'
import SKILZYYPAGE from '../assets/skilzyypage.png'
import visitpage from '../assets/visitpage.png'

function Hire() {
  const steps = [
    {
      title: "Step 1: Explore Freelancers",
      description: "Click on 'Freelancers' or 'Skilzyy' on the Home page. You'll be redirected to a curated list of skilled individuals.",
      image: SKILZYYPAGE,
    },
    {
      title: "Step 2: Search & Filter",
      description: "Browse through available talent. You can search by name, city, or state. Filter results to find the right match near you.",
      image: FILTER,
    },
    {
      title: "Step 3: View Full Profile",
      description: "Found right talent? Click their card to see their full profile, skills, work samples, and more.",
      image: visitpage,
    },
    {
      title: "Step 4: Connect & Collaborate",
      description: "Send a message directly. Discuss project details, timeline, and pricing. Keep conversations professional. Avoid sharing personal contact info.",
      image: MESSAGES,
    },
  ];

  return (
    <div className="hire">
      <h1>How to Hire on Skilzyy</h1>
      {steps.map((step, index) => (
        <div className="hire_container" key={index}>
          <div className="hire_text">
            <h2>{step.title}</h2>
            <p>{step.description}</p>
          </div>
          <div className="card_image">
            {step.image ? (
              <img src={step.image} alt={`Illustration for ${step.title}`} />
            ) : (
              <div className="image_placeholder">[Image Placeholder]</div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Hire;
