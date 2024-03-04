import { createSlice } from "@reduxjs/toolkit";
import { getToken, checkToken, getAuthanticatedUser as getuser } from "../../utils/auth.ts";
import { loginUser } from "../api/authAPI.ts";
import { toast } from "react-toastify";
import { removeCookieItem, removeStorigeItem, setCookie, setStorageItem } from "../../utils/helpers.ts";
import { USER_TOKEN } from "../../utils/constans.ts";

const initialVal = {
  token: getToken(),
  isLogin: await checkToken(),
  error: {},
  loading: false,
  user: await getuser(),
};

const authSlice = createSlice({
  initialState: initialVal,
  name: "auth",
  reducers: {
    getUser(state){
      getuser()
      .then(user=>{
        state.user = user
      }).catch(()=>{
        state.user = null;
      })
    },
    logOut(state){
      removeStorigeItem(USER_TOKEN)
      removeCookieItem(USER_TOKEN);
      state.isLogin = false;
      state.user = null;
      state.token = '';
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLogin = true
      state.token = action.payload.data.token;
      state.user = action.payload.data.user;
      state.error = false;
      state.loading = false;
      setCookie(USER_TOKEN, state.token, 1);
      setStorageItem(USER_TOKEN, state.token);
      toast.dismiss()
      toast.success("Welcome back")
    });
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      toast.loading("Please Wait")
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.error = action.error;
      state.isLogin = false,
      state.loading = false
      toast.dismiss()
      //@ts-ignore
      toast.error(action?.payload?.message || 'some error hapend');
    });
  },
});

export const {getUser, logOut} = authSlice.actions;

export default authSlice.reducer;
