import { configureStore, createSlice } from '@reduxjs/toolkit'

export interface UserState {
	token: string;
}

const initialState: UserState = {
	token: ""
}

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		loginUser: (state) => {

		},
		logoutUser: (state) => {

		}
	}
})

export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;