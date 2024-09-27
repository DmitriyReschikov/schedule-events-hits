import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface UserState {
    roles : string[];
}

const initial: UserState= {
    roles: []
}

const userSlice = createSlice({
    name: 'user',
    initialState: initial,
    reducers: {
        setRoles(state, action: PayloadAction<UserState>) {
            state.roles = action.payload.roles;
        }
    }
})

export const { setRoles } = userSlice.actions;
export default userSlice.reducer;
