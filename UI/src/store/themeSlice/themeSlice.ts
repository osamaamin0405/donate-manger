import {createSlice} from "@reduxjs/toolkit";
import {setTheme, darkIsDefault} from "../../utils/theme.ts";



const themeSlice = createSlice({
    name: "theme",
    initialState: {
        isDark: darkIsDefault(),
    },
    reducers: {
        setDark: (state)=>{
            setTheme(true)
            state.isDark = true;
        },
        setLight: (state)=>{
            setTheme(false)
            state.isDark = false;
        },
        toggle: (state)=>{
            setTheme(!state.isDark)
            state.isDark = !state.isDark;
        }
    }
})

export default themeSlice.reducer;

export  const {setLight, setDark, toggle} = themeSlice.actions