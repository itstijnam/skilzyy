import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { baseUrl } from "../../src/utils/baseUrl";
import { setAllUsersLiveJobs } from "../../redux/adminSlice";

const useGetAllLiveJobs = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllLiveJobs = async () => {
            try {
                const res = await axios.get(`${baseUrl}/api/job/get-all-live-jobs`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAllUsersLiveJobs(res.data.jobs));
                }
            } catch (error) {
                // console.log(error)
            }
        }
        fetchAllLiveJobs();
    }, []);
};

export default useGetAllLiveJobs;