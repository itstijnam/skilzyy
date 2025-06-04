import React, { useState } from 'react';
import '../style/AppliedJob.scss';
import { getCapName } from '../../../utils/getCapName';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useFormatDate from '../../../utils/useFormatDate';
import { setSelectedJob } from '../../../../redux/jobSlice';
import CurrentUserAllApliedJobs from '../../../../hooks/jobsHooks/currentUserAllApliedJobs';

function AppliedJob() {
    CurrentUserAllApliedJobs();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { appliedJobsByMe } = useSelector(store => store.job)
    const { user } = useSelector(store => store.auth)

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

            {appliedJobsByMe?.map((job, index) => (
                <div className="applied_job_box" key={index} onClick={() => {
                    navigate(`/job/${job._id}`)
                    dispatch(setSelectedJob(job));
                }}>
                    <div className="company_details">
                        <div className="company_logo">
                            <img src={job?.created_by?.profilePicture} alt={job.company_name} />
                        </div>
                        <div className="about_company_ajc">
                            <h2>{getCapName(job?.company_name)}</h2>
                            <h3>{getCapName(job?.post_name)}</h3>
                            <p>Last Date: <span>{useFormatDate(job?.last_date)}</span></p>
                        </div>
                    </div>
                    <div className="applied_job_status">
                        <p className={`badge ${getStatusClass(job?.applicants?.find(obj => obj.user === user._id)?.status)
                            }`}>
                            {
                                getStatusText(job?.applicants?.find(obj => obj.user === user._id)?.status)
                            }
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AppliedJob;