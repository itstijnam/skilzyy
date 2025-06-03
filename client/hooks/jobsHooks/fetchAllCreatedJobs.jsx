import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { baseUrl } from "../../src/utils/baseUrl";
import { setCurrentUserCreatedJobs } from "../../redux/jobSlice";

const fetchAllCreatedJobs = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchCurrentUserCreatedJobs = async () => {
            try {
                const res = await axios.get(`${baseUrl}/api/job/my-created-job`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setCurrentUserCreatedJobs(res.data.jobs));
                }
            } catch (error) {
                // console.log(error)
            }
        }
        fetchCurrentUserCreatedJobs();
    }, []);
};

export default fetchAllCreatedJobs;