import React, { useState, useEffect } from 'react';
import './ProfilePage.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { setAuthUser, setSelectedUser } from '../../../redux/authSlice';
import Button from '../../components/ui/Button';
import useGetFreelancerProfile from '../../../hooks/useGetFreelancerProfile';
import useGetAllFreelancerGig from '../../../hooks/useGetAllFreelancerGig';
import { setChats, setSelectedChat } from '../../../redux/chatSlice';
import { baseUrl } from '../../utils/baseUrl';
import BlankImage from '/homeComponent/blankProfile.png';

function ProfilePage() {
    const { user, userProfile } = useSelector((store) => store.auth);
    const {chats} = useSelector((store) => store.chat);
    const { gig } = useSelector(store => store.freelancer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [showMessage, setShowMessage] = useState('');
    const [showMessageIsGigDelete, setShowMessageIsGigDelete] = useState('');
    const [showServiceBox, setShowServiceBoX] = useState(false);

    const params = useParams();
    const username = params.username;


    // Fetch the freelancer's profile
    useGetFreelancerProfile(username);
    useGetAllFreelancerGig();

    const isServiceOn = user?.isFreelancer; // to show/change the color of user service

    // Determine if the logged-in user is viewing their own profile
    const isUserProfileLoggedInProfile = user?._id === userProfile?._id;

    const handleRating = async (value) => {
        if (!user) {
            setErrorMessage("Please log in to rate this profile.");
            return;
        }
        setRating(value);
        try {
            const freelancerId = isUserProfileLoggedInProfile ? user?._id : userProfile?._id;

            if (!freelancerId) {
                setErrorMessage("Freelancer ID is missing");
                return;
            }

            const res = await axios.post(`${baseUrl}/api/freelance/rate`, { freelancerId, score: value }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });

            if (res.data.success) {
                // Update user profile or do something after successful rating
            }
        } catch (error) {
            
        }
    };

    const deleteHandler = async (gigId)=>{
        try {
            const res = await axios.delete(`${baseUrl}/api/gig/delete/${gigId}`, {withCredentials: true})
            if(res.data.success){
                setShowMessageIsGigDelete(res.data.message)
            }
        } catch (error) {
            setShowMessageIsGigDelete(error?.response?.data?.message)
        }
    }

    const chatHandler = async (userId) => {
        try {
            const res = await axios.post(
                `${baseUrl}/api/chat`, 
                { userId }, 
                { withCredentials: true }
            );
            
            if (res.data.success) {
                // Update chats list first
                if (res.data.isExisting) {
                    // Only add to chats if it's a new chat
                    dispatch(setSelectedChat(res.data.fullChat._id));
                }
                
                // Set the selected chat
                dispatch(setChats([res.data.fullChat, ...chats]));
                
                // Then navigate
                navigate(`/message`);
            }
        } catch (error) {
            setErrorMessage(error?.response?.data?.message || "Failed to start chat");
        }
    };


    useEffect(()=>{
        const intervalId = setInterval(() => {
            setShowMessageIsGigDelete('')
        }, 3000);

        return ()=>clearInterval(intervalId);
    }, [showMessageIsGigDelete])

    return (
        <>
            {userProfile &&
                <div className='ProfilePage'>
                    <div className='profileHeader'>
                        <div className='userName'>
                            <span className='fName'>{userProfile?.person_name}</span>
                        </div>
                        <div className='userServicesHeading'>
                            <ol>
                                {gig &&
                                    gig?.slice(0, 3).map((singleGig) => {
                                        return (
                                            <div key={singleGig._id}>
                                                {singleGig?.author?._id === user?._id &&

                                                    <li key={singleGig?._id}>{singleGig?.desc}</li>
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </ol>
                        </div>
                        <div className='userReport'>
                            {isUserProfileLoggedInProfile ? (
                                <div>
                                <button onClick={()=>navigate(-1)} >↩</button>
                                <button onClick={()=>navigate('/')} >🏠︎</button>
                                <button onClick={() => navigate('/editProfile')}>Edit</button>
                                </div>
                            ) : (
                                <button onClick={()=>navigate(-1)} >↩</button>
                            )}
                        </div>
                    </div>
                    <div className='profileBackground'>
                        <div className='userInfoGround'>
                            <div className='userInfoDetail'>
                                <div className="userName2">
                                    <div className='golImage'>
                                        <p>{userProfile?.person_name}</p>
                                        <img src={userProfile?.profilePicture ? userProfile?.profilePicture : BlankImage } alt="" />
                                    </div>
                                    <pre>
                                        {userProfile?.bio ? <p>{userProfile?.bio}</p> : `${userProfile?.person_name} didn't put bio...`}
                                    </pre>
                                </div>
                                <div className="userReviews">
                                    <p>Reviews</p> <span>{userProfile?.averageRating} star</span>
                                </div>
                                <div className="btnForUser">
                                    {user ? (
                                        <button className='Rbtn'>Review</button>
                                    ) : (
                                        <button disabled className='Rbtn'>Log in to Review</button>
                                    )}
                                    <div className="rating-container">
                                        {[...Array(5)].map((_, index) => {
                                            const value = index + 1;
                                            return (
                                                <span
                                                    style={{ cursor: 'pointer' }}
                                                    key={value}
                                                    className={`star ${value <= (hover || rating) ? 'filled' : ''}`}
                                                    onClick={() => handleRating(value)}
                                                    onMouseEnter={() => setHover(value)}
                                                    onMouseLeave={() => setHover(0)}
                                                >
                                                    ★
                                                </span>
                                            );
                                        })}
                                    </div>
                                    <p className='ratingValue'>{rating ? `${rating} star(s)` : ""}</p>
                                    {user ? (
                                        // <></>
                                        <button className='Mbtn' onClick={()=>chatHandler(userProfile?._id)} >Message</button>
                                    ) : (
                                        // <></>
                                        <button className='Mbtn' disabled>Log in to Message</button>
                                    )}
                                </div>
                                <div className='userExpertise'>
                                    <div className="userOwnLogo">
                                        <img src={userProfile?.profilePicture ? userProfile?.profilePicture : BlankImage} alt="" />
                                    </div>
                                    <div className="userExpertiseRate">
                                        <p>City <span>{userProfile?.city}</span></p>
                                        <p>State <span>{userProfile?.state}</span></p>
                                        <p style={{ display: `flex`, alignItems: 'center' }} >On service ?
                                            <span className='serviceOnIndicator'
                                                style={{ border: isServiceOn ? '2px solid pink' : '2px solid red' }} ></span>
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    {showMessageIsGigDelete && <p className='showMessageIsGigDelete'>{showMessageIsGigDelete}</p> }
                                </div>
                            </div>
                            {/* <div className='userImageRight'>
                                <img src="/homeComponent/getIndependent1.png" alt="" />
                            </div> */}
                        </div>
                        <div className='userServices'>
                            {/* displaying services  */}
                            {
                                userProfile?.gigs?.slice(0, 3).map((singleGig) => {
                                    return (
                                        <div className='USBox1' key={singleGig?._id} >

                                            <div className="userImge">
                                                <img src={singleGig?.image} alt="" />
                                            </div>
                                            <div className="servLittleDetail">
                                                <div className="servLitName">Price: {singleGig?.price}</div>
                                                <div className="servLitExp"><p>Service: <span>{singleGig?.desc}</span></p></div>
                                            </div>

                                        </div>
                                    )
                                })
                            }


                        </div>
                    </div>
                    <div className='create'>
                        {userProfile?._id === user?._id &&
                            <>
                                {userProfile?.isFreelancer === true &&
                                    <Button name={`Create +`} onClick={() => navigate('/freelance/create')} />
                                }
                            </>
                        }
                        <Button name={`Home`} onClick={() => {
                            navigate('/')
                            setSelectedUser(null)
                        }} />
                        <Button name={`services`} onClick={() => setShowServiceBoX(!showServiceBox)} />
                    </div>
                    {
                        showServiceBox &&
                        <div className="servicesBox">
                            {/* displaying services  */}
                            {
                                userProfile?.gigs?.map((singleGig) => {
                                    return (
                                        <div className='serviceCard' key={singleGig?._id} >
                                            <span className='deleteIcon' onClick={()=>deleteHandler(singleGig?._id)} >Delete</span>
                                            <div className="serviceCardImg">
                                                <img src={singleGig?.image} alt="" />
                                            </div>
                                            <div className="serviceDetail">
                                                <div className="servicePrice">Price: {singleGig?.price}</div>
                                                <div className="service"><p><span>{singleGig?.desc}</span></p></div>
                                            </div>

                                        </div>
                                    )
                                })
                            }
                        </div>
                    }
                </div>
            }
            {
                !userProfile &&
                <div className='ProfilePage notProfilePage'
                    style={{ display: `flex`, justifyContent: `center`, alignItems: `center` }}
                >
                    <p
                        style={{ fontSize: '2rem', fontWeight: 800, color: 'orangered' }}
                    > OOPS! <span
                        style={{
                            fontSize: '2rem', fontWeight: 300, color: 'white',

                        }}
                    > Page doesn' exist or no longer exist</span></p>
                </div>
            }
        </>
    );
}

export default ProfilePage;
