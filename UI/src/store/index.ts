import {configureStore } from "@reduxjs/toolkit";
import themeSlice from "./themeSlice/themeSlice.ts";
import appSlice from "./appSlice/appSlice.ts";
import authSlice from "./authSlice/authSlice.ts";
const store = configureStore(
    {
        reducer: {
            theme: themeSlice,
            appState: appSlice,
            userAuth: authSlice,
        },
    }
);
export default store;

export type State = ReturnType<typeof store.getState>

export const CollapseSelector = (s:State) => s.appState.isOpenSidebar;
export  const themeSelector = (s:State) => s.theme.isDark;
export const isAuthSelector = (s:State) => s.userAuth.isLogin
export const authSelector = (s:State) => s.userAuth
export const userSelector =  (s:State) => s.userAuth.user;