// Jobs.jsx
import React from 'react'
import Add from './Add'
import '../style/Jobs.scss'
import wipro from '../components/images/wipro.jpg'

function Jobs() {
    return (
        <div>
            <section className="ads_section">
                <Add />
            </section>
            <div className="job_container">
                <div className="job_box">
                    {/* Example Job Card 1 */}
                    <div className="job_card">
                        <div className='job_desc'>
                            <div className="job_card_image">
                                <img src={wipro} alt="Wipro" />
                            </div>
                            <div className='job_post_heading'>
                                <div>
                                    <h2>Frontend Developer</h2>
                                    <h3>Wipro Technologies</h3>
                                </div>
                                <div className="job_card_quick_details">
                                    <p>Experience: <span>0-2 yrs</span></p>
                                    <p>Date: <span>16/09/23</span></p>
                                    <p className='job_card_vacancy' >Vacancy: <span>10</span></p>
                                    <p  className='job_card_applied'>Applied: <span>124</span></p>
                                </div>
                            </div>
                        </div>
                        <div className="job_card_apply_action">
                            <button>Apply</button>
                        </div>
                    </div>
                    
                    {/* <div className="job_card">
                        <div className='job_desc'>
                            <div className="job_card_image">
                                <img src={wipro} alt="Wipro" />
                            </div>
                            <div className='job_post_heading'>
                                <div>
                                    <h2>Frontend Developer</h2>
                                    <h3>Wipro Technologies</h3>
                                </div>
                                <div className="job_card_quick_details">
                                    <p>Experience: <span>0-2 yrs</span></p>
                                    <p>Date: <span>16/09/23</span></p>
                                    <p>Vacancy: <span>10</span></p>
                                    <p>Applied: <span>124</span></p>
                                </div>
                            </div>
                        </div>
                        <div className="job_card_apply_action">
                            <button>Apply Now</button>
                        </div>
                    </div> */}

                </div>
            </div>
        </div>
    )
}

export default Jobs