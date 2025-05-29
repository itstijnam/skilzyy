import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setUserProfile } from "../redux/authSlice";
import { baseUrl } from "../src/utils/baseUrl";
import { setChats } from "../redux/chatSlice";

const useGetAllChats = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetAllChats = async () => {
            try {
                const res = await axios.get(`${baseUrl}/api/chat`, { withCredentials: true });
                if (res.data.success) {
                    // console.log(res.data.chats);
                    dispatch(setChats(res.data.chats));

                }
            } catch (error) {
                // console.log(error)
            }
        }
        fetAllChats();
    }, []);
};

export default useGetAllChats;