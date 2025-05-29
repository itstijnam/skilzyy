import React, { useEffect, useState } from "react"
import './AuthPage.scss'
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "../../../redux/authSlice";
import { baseUrl } from "../../utils/baseUrl";
import { setChats } from "../../../redux/chatSlice";

function AuthPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const [login, setLogin] = useState(true)
  const [phnumber, setPhnumber] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [gender, setGender] = useState('male') // Default to male
  const [userName, setUserName] = useState('')
  const [popUpMessage, setPopUpMessage] = useState('')
  const [country, setCountry] = useState('')
  const [countryCode, setCountryCode] = useState('')

  // Detect user's country on component mount
  useEffect(() => {
    const detectCountry = async () => {
      try {
        const response = await axios.get('https://ipapi.co/json/');
        setCountry(response.data.country_name);
        setCountryCode(response.data.country_calling_code);
      } catch (error) {
        // Fallback values if detection fails
        setCountry('India');
        setCountryCode('+91');
      }
    };

    if (!login) { // Only detect for signup form
      detectCountry();
    }
  }, [login]);

  const loginPageHandler = (textType) => {
    if (textType === 'login') {
      setLogin(true)
    } else if (textType === 'signup') {
      setLogin(false)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${baseUrl}/api/freelance/login`, { userName, password }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      })
      if (res.data.success) {
        setPopUpMessage(res.data.message);
        dispatch(setAuthUser(res.data.currentUser));
        // dispatch(setChats(res.data.currentUser.contacts))
        setUserName('');
        setPassword('');
        navigate('/');
      }
    } catch (error) {
      setPopUpMessage(error.response?.data.message)
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${baseUrl}/api/freelance/register`,
        {
          userName,
          phnumber,
          country_code: countryCode, // <-- FIX HERE
          country,
          gender,
          password,
          fullName
        }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      })
      if (res.data.success) {
        setPopUpMessage(res.data.message);
        setUserName('');
        setPhnumber('');
        setGender('male');
        setPassword('');
        setFullName('');
      }
    } catch (error) {
      setPopUpMessage(error.response.data.message)
    }
  }

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setPopUpMessage('')
    }, 5000);
    return () => clearInterval(timer);
  }, [setPopUpMessage])

  return (
    <div className='auth'>
      <div className="authO">
        <div className="authImage">
          <img src="/homeComponent/getIndependent1.png" alt="" />
        </div>
      </div>
      <div className='authB2'>
      <div className="backArrowButton" onClick={() => navigate(-1)}>⮜</div>
        <div className='authB3'>
          <div className='authB4'>
            <div className='authB5'>
              <h1>skillzy</h1>
            </div>
            <p className='text-red-600'>We warmly welcome you</p>
          </div>
          <div className='formPageNavigation'>
            <p><span onClick={() => { loginPageHandler('login') }}>Login</span> <span onClick={() => loginPageHandler('signup')}>Signup</span></p>
            {
              !login &&
              <div>
                <form onSubmit={handleSignup} className='loginForm'>
                  <input type="text" name='freelanceName' className='' placeholder='Full Name' value={fullName} onChange={(e) => { setFullName(e.target.value) }} />
                  <input type="text" name='freelanceSocialMedia' className='' placeholder='User-name' value={userName} onChange={(e) => { setUserName(e.target.value) }} />

                  {/* Gender Select Dropdown */}
                  <div className="gender-select">
                    <label htmlFor="gender">Gender</label>
                    <select
                      id="gender"
                      name="gender"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>

                  {/* Phone Number with Country Code */}
                  <div className="phone-input">
                    <label>Phone Number</label>
                    <div className="phone-input-group">
                      <span className="country-code">{countryCode}</span>
                      <input
                        type="number"
                        name='freelanceUserNumber'
                        placeholder='Phone Number'
                        value={phnumber}
                        onChange={(e) => { setPhnumber(e.target.value) }}
                      />
                    </div>
                    <small className="country-name">Country: {country}</small>
                  </div>

                  <input type="password" name='password' className='' placeholder='Password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
                  {
                    popUpMessage &&
                    <p className='errorPopup'>{popUpMessage}</p>
                  }
                  <button type='submit'>Create Account</button>
                </form>
              </div>
            }
            {
              login &&
              <div>
                <form onSubmit={handleLogin} className='loginForm'>
                  <input type="text" name='freelanceSocialMedia' className='' placeholder='User-name' value={userName} onChange={(e) => { setUserName(e.target.value) }} />
                  <input type="password" name='password' className='' placeholder='Password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
                  {
                    popUpMessage &&
                    <p className='errorPopup'>{popUpMessage}</p>
                  }
                  <button type='submit' className='loginBtn'>Login</button>
                </form>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthPage