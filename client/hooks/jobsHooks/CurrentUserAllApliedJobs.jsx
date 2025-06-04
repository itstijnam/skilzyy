import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { baseUrl } from "../../src/utils/baseUrl";
import { setAppliedJobsByMe } from "../../redux/jobSlice";

const CurrentUserAllApliedJobs = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCurrentUserAppliedJobs = async () => {
            try {
                const res = await axios.get(`${baseUrl}/api/job/get-all-applied-jobs`, {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                });
                if (res.data.success) {
                    dispatch(setAppliedJobsByMe(res.data.jobs));
                }
            } catch (error) {
                console.error("🔥 Client Error fetching applicatioons:", {
                    status: error.response?.status,
                    data: error.response?.data,
                    message: error.message
                });
            }
        };

        fetchCurrentUserAppliedJobs();
    }, [dispatch]);


    return null; // or your actual component JSX
};

export default CurrentUserAllApliedJobs;