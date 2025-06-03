import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { baseUrl } from "../../src/utils/baseUrl";
import { setAllUsersPendingJobs } from "../../redux/adminSlice";

const fetchAllPendingJobs = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllUserCreatedJobs = async () => {
            try {
                const res = await axios.get(`${baseUrl}/api/job/get-all-pending-jobs`, { withCredentials: true });
                if (res.data.success) {
                    console.log(res.data.jobs)
                    dispatch(setAllUsersPendingJobs(res.data.jobs));
                }
            } catch (error) {
                // console.log(error)
            }
        }
        fetchAllUserCreatedJobs();
    }, []);
};

export default fetchAllPendingJobs;