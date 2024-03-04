import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
type loginProps = {
    username: string;
    password: string;
}
export const loginUser = createAsyncThunk(
    "auth/login",
    async function ({username, password}: loginProps, thunkApi){
        return axios.post("/auth/login",{
            username,
            password,
        },
        {
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(res=>{
            return res;
        })
        .catch(err=>{
            return thunkApi.rejectWithValue(err.response.data);
            throw err;
        })
    }
)