import React from 'react'
import '../style/Add.scss'
import AdsImage from '../components/images/tcsAddImage.jpeg'
import WIPRO from '../components/images/wipro.jpg'
import Accenture from '../components/images/accenture.jpeg'

function Add() {
  return (
    <div className='ads_container'>
      <div className="top_ads">
        <img src={AdsImage} alt="TCS Careers" />
      </div>
      
      <div className="mid_ads">
        <div className="mid_left_ads">
          <img src={WIPRO} alt="Wipro Opportunities" />
        </div>
        <div className="mid_right_ads">
          <img src={Accenture} alt="Accenture Jobs" />
        </div>
      </div>
      
      <div className="ads_links">
        <a href="https://skilzyy.com" target="_blank" rel="noopener noreferrer">Visit Skilzyy</a>
        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">Follow on Facebook</a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Follow on Instagram</a>
      </div>
    </div>
  )
}

export default Add