
import axios from "axios";
import { getToken } from "../utils/auth";

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
axios.defaults.headers.common.Authorization = "Brear " + getToken();
// axios.defaults.withCredentials = true