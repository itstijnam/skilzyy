import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setFreelancers } from "../redux/freeLancerSlice";
import { baseUrl } from "../src/utils/baseUrl";

const useGetAllFreelancers = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllFreelancers = async () => {
            try {
                const res = await axios.get(`${baseUrl}/api/freelance/freelancers`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setFreelancers(res.data.freelancers));
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchAllFreelancers();
    }, []);
};

export default useGetAllFreelancers;