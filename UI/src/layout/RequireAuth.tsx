import {useSelector} from "react-redux";
import {isAuthSelector} from "../store/index.ts";
import {ReactElement} from "react";
import {Navigate} from "react-router-dom";

interface RequireAuthProps{
	children: ReactElement,
}
export function RequireAuth({children}: RequireAuthProps) {
	const isLogin = useSelector(isAuthSelector);
	if(isLogin) return children
	return  <Navigate to="/auth/login" replace={true}/>
}