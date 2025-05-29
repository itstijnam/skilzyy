import { createSlice } from "@reduxjs/toolkit";

//   const [selectedContact, setSelectedContact] = useState(null);

const chatSlice = createSlice({
    name: 'chat', // Changed from 'auth' to 'chat'
    initialState: {
        chats: [],
        selectedChat: null,
        selectedContact: null
    },
    reducers: {
        setChats: (state, action) => {
            // Prevent duplicate chats
            const newChats = action.payload.filter(newChat =>
                !state.chats.some(existingChat =>
                    existingChat._id === newChat._id
                )
            );
            state.chats = [...newChats, ...state.chats];
        },
        setSelectedChat: (state, action) => {
            state.selectedChat = action.payload;
        },
        setSelectedContact: (state, action) => {
            state.selectedContact = action.payload;
        },
        addNewChat: (state, action) => {
            // Deduplicate before adding
            if (!state.chats.some(chat => chat._id === action.payload._id)) {
                state.chats.unshift(action.payload);
            }
        },
        resetChats: (state) => {
            state.chats = [];
            state.selectedChat = null;
            state.selectedContact = null;
        }
    }
});

export const { setSelectedChat, setChats, addNewChat, setSelectedContact, resetChats } = chatSlice.actions;
export default chatSlice.reducer;