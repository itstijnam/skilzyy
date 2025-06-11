import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { baseUrl } from "../../../../utils/baseUrl";
import { setAllgovjobs } from "../../../../../redux/govJobSlice";

const fetchAllGovJobs = () => {
    const dispatch = useDispatch();

    const detectCountry = async () => {
        try {
            const response = await axios.get('https://ipapi.co/json/');
            return response.data.country_name;
        } catch (error) {
            console.log(error)
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
};

export default fetchAllGovJobs;