import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { baseUrl } from "../../../../utils/baseUrl";
import { setAllgovjobs } from "../../../../../redux/govJobSlice";

const fetchAllGovJobs = () => {
    const dispatch = useDispatch();

    const detectCountry = async () => {
        try {
            // Option 1: ip-api.com (supports JSONP or use their CORS-enabled endpoint)
            const response = await fetch('http://ip-api.com/json/?fields=country');
            const data = await response.json();
            return data.country ;

        } catch (error) {
            console.error("Country detection failed, using default (India)");
            // return "India";
        }
    };
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const country = await detectCountry();
                const res = await axios.get(
                    `${baseUrl}/api/governmentjob/readallgovjobs?auth_country=${country}`,
                    { withCredentials: true }
                );

                if (res.data.success) {
                    console.log("Fetched jobs:", res.data.govJobs);
                    dispatch(setAllgovjobs(res.data.govJobs));
                }
            } catch (error) {
                console.error("Error fetching jobs:", error.response?.data || error.message);
            }
        };
        fetchJobs();
    }, [dispatch]);

    return null; // or return necessary data
};

export default fetchAllGovJobs;