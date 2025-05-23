import React, { useState } from "react";
import "./scss/GigsPage.scss";
import HeaderShown from "./components/HeaderShown";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useGetAllFreelancerGig from "../../../hooks/useGetAllFreelancerGig";
import { setSelectedGig } from "../../../redux/freeLancerSlice";

function GigsPage() {
  
  const [searchInput, setSearchInput] = useState("");
  const [filter, setFilter] = useState("new"); // Default: show new gigs

  useGetAllFreelancerGig(searchInput, filter); // Fetch gigs based on search & filter

  const { gig } = useSelector((store) => store.freelancer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  return (
    <div className="GigsPage">
      <div className="GPHeader">
        <HeaderShown />
      </div>
      <div className="GigPageSearchBar">
        <div className="searchChoices">
          <div className="SC">
            <span>New</span>
            <input 
              type="radio" 
              name="filter" 
              value="new" 
              checked={filter === "new"} 
              onChange={() => setFilter("new")} 
            />
          </div>
          <div className="SC">
            <span>Top</span>
            <input 
              type="radio" 
              name="filter" 
              value="top" 
              checked={filter === "top"} 
              onChange={() => setFilter("top")} 
            />
          </div>
        </div>
        <div className="searchInput">
          <input
            type="text"
            placeholder="Search service, name, city"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <div className="searchImage">
            <img src="/homeComponent/search.png" alt="Search" />
          </div>
        </div>
      </div>
      <div className="AllUsersGigs">
        <div className="gigContainers">
          {gig &&
            gig
              .filter((singleGig) => singleGig.author.isFreelancer)
              .map((singleGig) => (
                <div
                  className="gigCard"
                  key={singleGig._id}
                  onClick={() => {
                    navigate(`/f/gig`)
                    dispatch(setSelectedGig(singleGig))
                  }}
                >
                  <div className="CardImage">
                    <img src={singleGig?.image} alt="" />
                  </div>
                  <div className="cardSubDetail">
                    <div className="cardHeading">
                      <p>{singleGig?.desc}</p>
                    </div>
                    <div className="cardUserInfo">
                      <div className="userName">
                        <p>{singleGig?.author?.person_name}</p>
                      </div>
                      <div className="starIcon">
                        <img src="/homeComponent/star.png" alt="Star" />
                        <span>
                          {singleGig?.author?.ratings?.length > 0
                            ? (
                                singleGig.author.ratings.reduce((sum, r) => sum + r.score, 0) /
                                singleGig.author.ratings.length
                              ).toFixed(1)
                            : "No rating"}
                        </span>
                      </div>
                      <p className="userlocation">
                        <span>
                          {singleGig?.author?.city}, {singleGig?.author?.state}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}

export default GigsPage;
