import React, { useEffect, useState, useRef } from 'react';
import './CreateDialog.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { baseUrl } from '../../../utils/baseUrl';
import AddIcon from '../icon/addIcon.png';


function CreateDialog() {
    const { user } = useSelector((store) => store.auth);
    const [createLoading, setCreateLoading] = useState(true);

    const [file, setFile] = useState('');
    const [price, setPrice] = useState('');
    const [service, setService] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const [loading, setLoading] = useState(false);

    
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Create a ref for the file input
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (!user || user === null) {
            navigate('/');
            setCreateLoading(true);
        } else {
            setCreateLoading(false);
        }

    }, [user, navigate]);

    useEffect(()=>{
        const intervalId = setInterval(() => {
            setErrorMessage('')
        }, 3000);

        return ()=>clearInterval(intervalId)
    }, [errorMessage])

    // Function to handle the click event of the "Upload" button
    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const imageFileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        if (file) {
    
            // Check if the selected file is an image
            if (file && file.type.startsWith('image/')) {
                setFile(file);
                const imageUrl = URL.createObjectURL(file); // Create a URL for the file
                setImagePreview(imageUrl);  // Set it as the image preview
            } else {
                alert("Please select an image file.");
            }
        }
    };

    const createFreelanceCardHandler = async (e)=>{
        const formData = new FormData();
        if(!service) return setErrorMessage('Service, Image and Price Required');
        if(!imagePreview) return setErrorMessage('Service, Image and Price Required');
        if(!price) return setErrorMessage('Service, Image and Price Required');

        if(service) formData.append('service', service);
        if(price) formData.append('price', price);
        if(file) formData.append('image', file);

        try {
            setLoading(true);
            const res = await axios.post(`${baseUrl}/api/gig/create`, formData, {
                headers : {'Content-Type' : 'multipart/form-data'},
                withCredentials: true
            });

            if(res.data.success){
                console.log(res.data.success);
                setPrice('');
                setService('');
                setFile('')
                setImagePreview('')
                navigate(`/profile/${user?.username}`);
            }
        } catch (error) {
            setErrorMessage(error?.response?.data?.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            {createLoading && (
                <div
                    style={{
                        color: 'black',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    Loading......
                </div>
            )}
            {!createLoading && (
                <div className="CreateDialog">
                    <div className="container BLR">
                        <div className="top">
                            <div className="image">
                                <img src={`/homeComponent/star.png`} alt="" />
                            </div>
                            <div className="pageTitle">
                                <p onClick={()=>navigate(`/profile/${user?.username}`)} >DashBoard</p>
                                <p>Create Service</p>
                            </div>
                        </div>
                        <div className="mid">
                            <img src="" alt="" />
                            <img src={imagePreview ? `${imagePreview}` : AddIcon} alt="Image Preview" />
                        </div>
                        {
                            errorMessage && <div 
                                style={{ width: '100%', alignItems: 'center', color: 'red',
                                    display: 'flex', justifyContent: 'center'
                                }}
                            >{errorMessage}</div>
                        }
                        <div className="bottom">
                            <input type="text" placeholder='Service Name'
                                value={service} onChange={(e)=>setService(e.target.value)}
                            />
                            <div className='btop'>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}  // Hides the file input
                                onChange={imageFileChangeHandler}
                            />

                            {/* You can add other form inputs here */}
                            <input type="number" placeholder='Price' value={price} onChange={(e)=>setPrice(e.target.value)} />
                            {/* Upload Button */}
                            <button onClick={handleUploadClick} className='Upload'>{ imagePreview ? <p>Change</p> : <p>Upload</p>}</button>

                            {/* Hidden file input */}
                            </div>
                            {
                                loading ? 
                                <button className='Create'>Please Wait....</button> : 
                                <button type='submit' className='Create' onClick={createFreelanceCardHandler}>Create</button> 
                            }
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default CreateDialog;
