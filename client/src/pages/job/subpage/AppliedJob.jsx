// import React from 'react'
// import '../style/AppliedJob.scss';
// import { getCapName } from '../../../utils/getCapName';

// function AppliedJob() {

//     const fakeAppliedJob = [
//         {
//             company_name: 'TCS',
//             company_logo: '',
//             post: 'Frontend Developer',
//             status: 'hired',
//             applied_on: '12 Juner 2023',
//         }
//     ]

//   return (
//     <div className='applied_jobs_container'>
//         <div className="applied_job_box">
//             <div className="comapny_details">
//                 <div className="company_logo">
//                     <img src="" alt="" />
//                 </div>
//                 <div className="about_commpany_ajc">
//                     <h2> {getCapName('Company Name')} </h2>
//                     <h3> {getCapName('Frontend Developer')} </h3>
//                     <p>Applied on : <span>12 June 2024</span></p>
//                 </div>
//             </div>
//             <div className="applied_job_status">
//                 <p className="badge">hire/pending/rejected</p>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default AppliedJob


import React from 'react';
import '../style/AppliedJob.scss';
import { getCapName } from '../../../utils/getCapName';
import { useNavigate } from 'react-router-dom';

function AppliedJob() {

    const navigate = useNavigate();

    const fakeAppliedJobs = [
        {
            company_name: 'TCS',
            company_logo: 'https://via.placeholder.com/80',
            post: 'Frontend Developer',
            status: 'hired',
            applied_on: '12 June 2023',
        },
        {
            company_name: 'Infosys',
            company_logo: 'https://via.placeholder.com/80',
            post: 'UI Designer',
            status: 'pending',
            applied_on: '5 May 2023',
        },
        {
            company_name: 'Wipro',
            company_logo: 'https://via.placeholder.com/80',
            post: 'Backend Engineer',
            status: 'rejected',
            applied_on: '20 April 2023',
        }
    ];

    const getStatusClass = (status) => {
        switch (status) {
            case 'hired':
                return 'status-hired';
            case 'pending':
                return 'status-pending';
            case 'rejected':
                return 'status-rejected';
            default:
                return '';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'hired':
                return 'Hired';
            case 'pending':
                return 'Pending Review';
            case 'rejected':
                return 'Not Selected';
            default:
                return status;
        }
    };

    return (
        <div className='applied_jobs_container'>
            {/* <h1 className="applied_jobs_heading">Your Job Applications</h1> */}

            {fakeAppliedJobs.map((job, index) => (
                <div className="applied_job_box" key={index} onClick={() => navigate('/job/asd')}>
                    <div className="company_details">
                        <div className="company_logo">
                            <img src={job.company_logo} alt={job.company_name} />
                        </div>
                        <div className="about_company_ajc">
                            <h2>{getCapName(job.company_name)}</h2>
                            <h3>{getCapName(job.post)}</h3>
                            <p>Applied on: <span>{job.applied_on}</span></p>
                        </div>
                    </div>
                    <div className="applied_job_status">
                        <p className={`badge ${getStatusClass(job.status)}`}>
                            {getStatusText(job.status)}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AppliedJob;