import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setGig } from "../redux/freeLancerSlice.js";
import { baseUrl } from "../src/utils/baseUrl.js";

const useGetAllFreelancerGig = (searchInput = "", filter = "new") => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAllGig = async () => {
            try {
                const res = await axios.get(`${baseUrl}/api/gig/getallgigs`, {
                    params: { search: searchInput, filter }, // Send search & filter parameters
                    withCredentials: true
                });

                if (res.data.success) {
                    dispatch(setGig(res.data.gig));
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchAllGig();
    }, [searchInput, filter]); // Refetch when search or filter changes
};

export default useGetAllFreelancerGig;
