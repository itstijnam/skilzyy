import React from 'react'
import './About.scss'
function About() { 
    return (
        <div className='about'>
            <div className='box1'>
                <div className="one">
                    <p>WELCOME TO SKILZYY</p>
                    <h3>About <span>SKILZYY</span></h3>
                </div>
                <div className="two">
                    <p>
                    I am envisioning the creation of a forward-thinking venture focused on providing exceptional technology solutions. Although we are just beginning this journey, I am confident in the vision, the adaptability we aim to foster, and the commitment to exceeding expectations in an ever-evolving digital landscape. My goal is to build a team that is driven by innovation, customer satisfaction, and the pursuit of excellence. With the right mindset and relentless dedication, I believe we can establish a strong foundation and deliver impactful results that align with our clients' needs.
                    </p>
                        <span>
                            I would strongly recommend their services to any organization that is looking for solid, reliable, and predictable outcomes.
                        </span>
                </div>
                {/* <div className="three">
                    <button>Learn More <span><img src="/img/rightarrow.png" alt="" /></span></button>
                </div> */}
            </div>
            <div className='box2'>
                <img src="/homeComponent/youth.png" alt="" />
            </div>
            <div className='box3'></div>
        </div>
    )
}

export default About