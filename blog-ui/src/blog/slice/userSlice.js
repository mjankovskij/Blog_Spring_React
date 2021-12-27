import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    user: null,
    jwtToken: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser(user, {payload}) {
            return payload;
        },
        removeUser() {
            return initialState;
        }
    }
});

export default userSlice.reducer;
export const {addUser, removeUser} = userSlice.actions;