import {ConfigProvider, theme, Layout, App } from "antd";
import {useSelector} from "react-redux";
import {CollapseSelector, themeSelector} from "../store/index.ts";
import Sidebar from "../components/sidebar/Sidebar.tsx";
import Header from "../components/header/Header.tsx";
import {Outlet} from "react-router-dom";
import {SIDEBAR_COLLAPSED_WIDTH, SIDEBAR_FULL_WIDTH} from "../utils/constans.ts";
import { darkColorsTheme, lightColorsTheme } from "../css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const MainLayout = () => {
	const isDark = useSelector(themeSelector),
		isCollapsed = useSelector(CollapseSelector),
		ml:number = isCollapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_FULL_WIDTH;
	// const pattern = isDark ? "./assets/pattern_dark.svg": "./assets/pattern.svg"
	return (
		<ConfigProvider
			theme={
				{
					algorithm: isDark ? theme.darkAlgorithm: theme.defaultAlgorithm,
					token: isDark ? darkColorsTheme : lightColorsTheme,
					components:{
						// Button: {
						// 	primaryColor: "#fff0"
						// }
					}
				}
			}
		>
			<App >
				<Layout style={{minHeight: "100vh"}}>
					<Sidebar />
					<Layout style={{marginLeft: ml}} className="transition-all ease-in-out duration-500">
						<Header  />
						<Layout.Content >
							<div className="container m-auto p-2">
								<Outlet />
							</div>
						</Layout.Content>
						{/*<Layout.Footer >Footer</Layout.Footer>*/}
					</Layout>
				</Layout>
				<ToastContainer theme={isDark ? "dark": "light"}/>
			</App>
		</ConfigProvider>
	)
}

export default MainLayout