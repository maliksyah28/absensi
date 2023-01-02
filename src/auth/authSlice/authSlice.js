import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    NIK: 0,
    Username: "",
    RoleId: 0,
    Token : ""
  };
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      login: (state, action) => {
        // action : { type: "auth/login",  payload : {id, username, name, email, password} }
        state.NIK = action.payload.NIK;
        state.Username = action.payload.Username;
        state.RoleId = action.payload.RoleId;
        state.Token = action.payload.Token
      },
      logout: (state) => {
        state.NIK= initialState.id;
        state.Username = initialState.Username;
        state.RoleId = initialState.RoleId
        state.Token = initialState.Token
      },
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;