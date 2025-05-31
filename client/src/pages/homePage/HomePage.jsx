import React, { useState, useEffect } from "react";
import "./HomePage.scss";
import SubContent from "./component/subContent/SubContent";
import About from "./component/about/About";
import Bubble from "./component/bubble/Bubble";
import { useNavigate } from "react-router-dom";
import { setAuthUser, setSelectedUser } from "../../../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import MiniScreen from "./component/miniScreen/MiniScreen";
import useGetAllFreelancers from "../../../hooks/useGetAllFreelancers";
import { FiSearch, FiUser, FiLogOut, FiArrowRight } from "react-icons/fi";
import { FaGem, FaRocket, FaChartLine } from "react-icons/fa";
import { motion } from "framer-motion";
import { baseUrl } from "../../utils/baseUrl";
import SKILZYY from '/homeComponent/SKILZYY.png'
import { resetChats } from "../../../redux/chatSlice";
import useGetAllChats from "../../../hooks/useGetAllChats";

function HomePage() {
  const [message, setMessage] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const { freelancers } = useSelector((store) => store.freelancer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  useGetAllFreelancers();


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      const element = document.documentElement;
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  };

  const logoutHandler = async () => {
    try {
      const res = await axios.get(
        `${baseUrl}/api/freelance/logout`,
        { withCredentials: true }
      );
      if (res.data.success) {
        dispatch(setAuthUser(null));
        setMessage(res.data.message);
        dispatch(resetChats());
        navigate("/");
      }
    } catch (error) {
      
    }
  };

  return (
    <div className="HomePage">
      {/* Animated Background Elements */}
      <div className="animated-bg-elements">
        <div className="circle-1"></div>
        <div className="circle-2"></div>
        <div className="circle-3"></div>
      </div>

      {/* Header with sticky behavior */}
      <header className={`Header ${isScrolled ? "scrolled" : ""}`}>
        <motion.div
          className="logo"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="skilzyy_logo">
            <div className="skilzyy_image">
              <img src={SKILZYY} alt="" />
            </div>
            <div className="skillzy_text">
              <span className="logo-text" onClick={handleFullscreen}>
                SKILZYY
              </span>
              <span className="logo-tagline">Freelance Your Way</span>
            </div>
          </div>
        </motion.div>

        <nav className="navigation">
          <ul className="nav-links">
            <li className="active">Home</li>
            <li onClick={() => navigate('/f')} >Skilzyy</li>
            <li onClick={()=>navigate('/contact')}>Contact Us</li>
          </ul>

          {/* Dashboard link - always visible when logged in */}
          {user && (
            <div className="mobile-dashboard-link"
              onClick={() => {
                navigate(`/profile/${user.username}`);
                dispatch(setSelectedUser(user));
              }}
            >
              <FiUser className="nav-icon" /> DashBoard
            </div>
          )}

          {/* <div className="search-bar">
            <FiSearch className="search-icon" />
            <input type="text" placeholder="Find services, freelancers..." />
          </div> */}

          {user ? (
            <motion.button
              className="auth-button logout"
              onClick={logoutHandler}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiLogOut /> Logout
            </motion.button>
          ) : (
            <motion.button
              className="auth-button"
              onClick={() => navigate("/auth")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign In
            </motion.button>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            The <span className="highlight">Smart Way</span> to Work
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Find the perfect freelance services for your business with Skillzy.
            Join millions of professionals using the world's leading freelance
            marketplace.
          </motion.p>
          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <button className="primary-btn" onClick={() => navigate("/f")}>
              Find Freelancers <FiArrowRight />
            </button>
            <button className="secondary-btn" onClick={handleFullscreen}>
              Full Screen Experience
            </button>
          </motion.div>
        </div>

        <div className="hero-image">
          <div className="laptop-mockup">
            <div className="screen">
              {freelancers.slice(0, 10).map((f) => (
                <MiniScreen key={f._id} freelancer={f} />
              ))}
            </div>
          </div>

          {/* floating cards  */}

          {/* <div className="floating-cards">
            <div className="card card-1">
              <FaGem className="card-icon" />
              <span>Premium Talent</span>
            </div>
            <div className="card card-2">
              <FaRocket className="card-icon" />
              <span>Fast Delivery</span>
            </div>
            <div className="card card-3">
              <FaChartLine className="card-icon" />
              <span>Quality Results</span>
            </div>
          </div> */}

        </div>
      </section>


      
      {/* Sub Content */}
      <section className="subContentGround">
        <SubContent />
      </section>



      {/* Trust Indicators */}
      <section className="trust-section">
        <div className="trust-item">
          {/* <span className="trust-number">10M+</span> */}
          {/* <span className="trust-label">Active Users</span> */}
          <span className="trust-number">Trusted Youth</span>
          <span className="trust-label">Users</span>
        </div>
        <div className="trust-item">
          {/* <span className="trust-number">5M+</span>
          <span className="trust-label">Projects Completed</span> */}
          <span className="trust-number">New Ideas</span>
          <span className="trust-label">Projects</span>
        </div>
        <div className="trust-item">
          {/* <span className="trust-number">200+</span>
          <span className="trust-label">Skills Available</span> */}
          <span className="trust-number">Young Talent</span>
          <span className="trust-label">Skills</span>
        </div>
        <div className="trust-item">
          <span className="trust-number">99%</span>
          <span className="trust-label">Satisfaction Rate</span>
        </div>
      </section>


      {/* About Section */}
      <section className="homeAbout">
        <About />
      </section>

      {/* Bubble Section */}
      <section className="homeBubble">
        <Bubble />
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to Get Started?</h2>
        <p>Join Skillzy today and take your projects to the next level.</p>
        <div className="cta-buttons">
          {/* <button className="cta-primary" onClick={() => navigate("/auth")}>
            Join Free
          </button> */}
          <button className="cta-secondary" onClick={() => navigate("/f")}>
            Browse Freelancers
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="main-footer">
        <div className="footer-content">
          <div className="footer-logo">
            <span>SKILLZY</span>
            <p>Connecting talent with opportunity</p>
          </div>
          <div className="footer-links">
            <div className="link-column">
              <h4>For Clients</h4>
              <ul>
                <li onClick={()=>navigate('/clients')} >How to Hire</li>
                {/* <li>Talent Marketplace</li>
                <li>Project Catalog</li> */}
                <li onClick={()=>navigate('/clients/enterprise')}>Enterprise Solutions</li>
              </ul>
            </div>
            <div className="link-column">
              <h4>For Skilzyy</h4>
              <ul>
                <li onClick={()=>navigate('/howtofind')}>How to Find Work</li>
                {/* <li>Direct Contracts</li>
                <li>Find Freelance Jobs</li>
                <li>Resources</li> */}
              </ul>
            </div>
            <div className="link-column">
              <h4>Company</h4>
              <ul>
                <li onClick={()=>navigate('/contact')}>Contact Us</li>
                {/* <li>Terms of Service</li> */}
                <li onClick={()=>navigate('/privacy-policy')}>Privacy Policy</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Skillzy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;