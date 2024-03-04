import {Divider, Layout, Menu, theme} from "antd";
import {useSelector} from "react-redux";
import {CollapseSelector,themeSelector} from "../../store/index.ts";
import sidebarLinks from "../../routes/sidebarLinks.tsx";
import SidebarHeader from "./SideHeader.tsx";
import {SidebarContainer}  from "./SidebarStyle.ts"
import {SIDEBAR_COLLAPSED_WIDTH, SIDEBAR_FULL_WIDTH} from "../../utils/constans.ts";
export default function Sidebar()  {
	const isCollapsed = useSelector(CollapseSelector),
		isDark = useSelector(themeSelector);
	const { 
		token: { colorBgContainer },
	} = theme.useToken();
	return (
		<Layout.Sider className="overflow-hidden hover:overflow-auto" style={{...SidebarContainer, backgroundColor:colorBgContainer}} collapsedWidth={SIDEBAR_COLLAPSED_WIDTH}  width={SIDEBAR_FULL_WIDTH} collapsed={isCollapsed}>
			<SidebarHeader className="mb-1" />
			<Divider />
			<Menu
				items={sidebarLinks}
				style={{ backgroundColor:colorBgContainer}}
				theme={isDark ? "dark" : "light"}
			>
			</Menu>
		</Layout.Sider>
	)
}