import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setUserProfile } from "../redux/authSlice";
import { baseUrl } from "../src/utils/baseUrl";

const useGetFreelancerProfile = (username) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchFreelancerProfile = async () => {
            try {
                const res = await axios.get(`${baseUrl}/api/freelance/freelancer/${username}`);
                if (res.data.success) {
                    dispatch(setUserProfile(res.data.user));
                }
            } catch (error) {
                dispatch(setUserProfile(null))
                console.log(error)
            }
        }
        fetchFreelancerProfile();
    }, [username]);
};

export default useGetFreelancerProfile;