import React, { useState, useRef, useEffect } from 'react';
import { FaTrash, FaPlus, FaArrowLeft } from 'react-icons/fa';
import { FiEdit3, FiUser, FiPhone, FiMapPin, FiInfo } from 'react-icons/fi';
import './EditProfile.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '../../../../redux/authSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../../utils/baseUrl';

function EditProfile({ userInfo }) {
    const [image, setImage] = useState(userInfo?.profilePicture || '');
    const [popupMessage, setPopupMessage] = useState('');
    const [hovered, setHovered] = useState(false);
    const fileInputRef = useRef(null);
    const { user } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        person_name: user?.person_name || '',
        username: user?.username || '',
        phnumber: user?.phnumber || '',
        bio: user?.bio || '',
        city: user?.city || '',
        state: user?.state || '',
        isFreelancer: user?.isFreelancer || false
    });

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInputClick = () => fileInputRef.current.click();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
        }
    };

    const handleDeleteImage = () => {
        setImage('');
        setSelectedFile(null);
    };

    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            Object.keys(formData).forEach(key => formDataToSend.append(key, formData[key]));
            if (selectedFile) formDataToSend.append('profile-image', selectedFile);

            const response = await axios.put(
                `${baseUrl}/api/freelance/editProfile`,
                formDataToSend,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    withCredentials: true
                }
            );

            if (response.data.success) {
                dispatch(setAuthUser(response.data.currentUser));
                setPopupMessage({ text: response.data.message, type: 'success' });
            }
        } catch (error) {
            setPopupMessage({ text: error?.response?.data.message || 'Update failed', type: 'error' });
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => setPopupMessage(''), 5000);
        return () => clearTimeout(timer);
    }, [popupMessage]);

    return (
        <div className='edit-profile'>
            <div className='profile-header'>
                {/* <button className='back-btn' onClick={() => navigate(`/profile/${user?.username}`)}>
                    <FaArrowLeft /> Back
                </button> */}
                <h1>Edit Your Profile</h1>
                <p>Make it stand out!</p>
            </div>

            <div className='profile-content'>
                <div className='avatar-section'>
                    <div 
                        className='avatar-container'
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                    >
                        <img 
                            src={image || user.profilePicture || '/homeComponent/blankProfile.png'} 
                            alt="Profile" 
                            className='profile-avatar'
                        />
                        {hovered && (
                            <div className='avatar-overlay' onClick={image ? handleDeleteImage : handleFileInputClick}>
                                {image ? <FaTrash /> : <FiEdit3 />}
                            </div>
                        )}
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            accept='.png, .jpg, .jpeg, .svg, .webp'
                            hidden
                        />
                    </div>
                </div>

                {popupMessage && (
                    <div className={`popup-message ${popupMessage.type}`}>
                        {popupMessage.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className='profile-form'>
                    <div className='form-group'>
                        <FiUser className='input-icon' />
                        <input
                            type='text'
                            name='person_name'
                            value={formData.person_name}
                            onChange={handleChange}
                            placeholder='Full Name'
                        />
                    </div>

                    <div className='form-group'>
                        <FiUser className='input-icon' />
                        <input
                            type='text'
                            name='username'
                            value={formData.username}
                            onChange={handleChange}
                            placeholder='Username'
                            required
                        />
                    </div>

                    <div className='form-group'>
                        <FiPhone className='input-icon' />
                        <input
                            type='text'
                            name='phnumber'
                            value={formData.phnumber}
                            onChange={handleChange}
                            placeholder='Phone Number'
                            required
                        />
                    </div>

                    <div className='form-group'>
                        <FiInfo className='input-icon' />
                        <textarea
                            name='bio'
                            value={formData.bio}
                            onChange={handleChange}
                            placeholder='Tell us about yourself...'
                            rows='3'
                        />
                    </div>

                    <div className='form-row'>
                        <div className='form-group'>
                            <FiMapPin className='input-icon' />
                            <input
                                type='text'
                                name='city'
                                value={formData.city}
                                onChange={handleChange}
                                placeholder='City'
                            />
                        </div>
                        <div className='form-group'>
                            <FiMapPin className='input-icon' />
                            <input
                                type='text'
                                name='state'
                                value={formData.state}
                                onChange={handleChange}
                                placeholder='State'
                            />
                        </div>
                    </div>

                    <label className='freelancer-toggle'>
                        <input
                            type='checkbox'
                            name='isFreelancer'
                            checked={formData.isFreelancer}
                            onChange={handleChange}
                        />
                        <span className='toggle-slider'></span>
                        <span className='toggle-text'>I want to be a freelancer</span>
                    </label>

                    <button type='submit' className='save-btn'>
                        Save Changes
                    </button>
                    <button className='back-btn' onClick={() => navigate(`/profile/${user?.username}`)}>
                    <FaArrowLeft /> Back
                </button>
                </form>
            </div>
        </div>
    );
}

export default EditProfile;