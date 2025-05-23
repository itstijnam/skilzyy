import React from 'react'
import './SubContent.scss'
import VIDEOEDITING from './icons/video-camera.png'
import ANALYSIS from './icons/analysis.png'
import WEBDEVELOP from './icons/app-development.png'
import MOTOR from './icons/motor.png'

function SubContent() {

    const subContentItems = [
        { 
            text: 'Video Editing', 
            image: '/homeComponent/video.webp',
            shortDesc: 'Get Top Modern Youth touch to your video Awesome'
        },
        { 
            text: 'Toy Repair', 
            image: '/homeComponent/toy.webp',
            shortDesc: 'Get Expensive Toys Repaired by youth'
        },
        { 
            text: 'Web-App', 
            image: '/homeComponent/web.webp',
            shortDesc: 'Hire Creative and Unique Mindset'
        },
        { 
            text: 'Business Analysis', 
            image: '/homeComponent/business.webp',
            shortDesc: 'Explore your business with creative thinking and ideas'
        },
    ]

    return (
        <div className='SubContent'>
            <span>
                SERVICES
            </span>
            <div className='subContentCaraousel'>
                
                {/* loop start  */}
                {subContentItems.map((s, i) => (
                    <div className='listCard' key={i}>
                        <div className='CardImage'>
                            <img src={s.image} alt="" />
                        </div>
                        <div className='CardDetails'>
                            <ul><li>{s.text}</li></ul>
                            <p>{s.shortDesc}</p>
                            {/* <button></button> */}
                        </div>
                    </div>
                ))}


                {/* loop end  */}
            </div>
            <div>
                {/* <button className='caraouselBtn'>Get Started</button> */}
            </div>
        </div>
    )
}

export default SubContent