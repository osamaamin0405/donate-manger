import {Avatar, Button, Space, SpaceProps, Dropdown} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {isAuthSelector, themeSelector, userSelector} from "../../store/index.ts";
import {toggle} from "../../store/themeSlice/themeSlice.ts";
import {FaSun, FaRegMoon} from "react-icons/fa";
import items from "../../routes/ProfileLinks.tsx";
// import langs from "../../routes/LangsList.tsx";
import { changeLanguage } from "../../utils/helpers.ts";

export const HeaderRight = (props:SpaceProps) => {
	const isDark = useSelector(themeSelector),
				dispatch = useDispatch(),
				isLogin = useSelector(isAuthSelector),
				user = useSelector(userSelector);
	function getAvater(){
		const usernameArr = `${user.fname} ${user.lname}`.split(" ");
		return (usernameArr[0][0] + usernameArr[usernameArr.length-1][0]).toUpperCase();

	}

	return (
		<Space {...props}>
			<Button
				onClick = {()=>dispatch(toggle())}
				icon = {!isDark ? <FaSun/>: <FaRegMoon/> }
				title={isDark ? "Dark mod" : "Light mod"}
			/>
			<Space>
				<Button onClick={()=>changeLanguage("ar")}>ع</Button>
				<Button  onClick={()=>changeLanguage("en")}>EN</Button>
			</Space>
			{isLogin && 
				<Dropdown overlayClassName="w-40" menu={{items}} trigger={['click']} arrow>
					<a onClick={(e) => e.preventDefault()}>
						<Space>
							<Avatar size='large' src={process.env.REACT_APP_API_BASE_URL + "/" + user.image}>{getAvater()}</Avatar>
						</Space>
					</a>
				</Dropdown>
			}
		</Space>
	)
}