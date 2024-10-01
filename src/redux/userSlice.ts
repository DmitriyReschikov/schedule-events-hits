import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface UserState {
    id: string;
    roles : string[];
}

const initial: UserState= {
    id: '',
    roles: []
}

const userSlice = createSlice({
    name: 'user',
    initialState: initial,
    reducers: {
        setInfo(state, action: PayloadAction<UserState>) {
            state.roles = action.payload.roles;
            state.id = action.payload.id
        }
    }
})

export const { setInfo } = userSlice.actions;
export default userSlice.reducer;
