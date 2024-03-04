import {Header as AHeader} from "antd/es/layout/layout";
import {headerStyle} from "./styles.ts";
import {HeaderLeft} from "./HeaderLeft.tsx";
import {HeaderRight} from "./HeaderRight.tsx";
// import useTheme from "antd/lib/config-provider/hooks/useTheme";
import {theme} from "antd";

export default function Header() {

	const {
		token: { colorBgContainer },
	} = theme.useToken();
	return (
		<AHeader style={{...headerStyle, backgroundColor: colorBgContainer}}>
			<HeaderLeft />
			<HeaderRight/>
		</AHeader>
	)
}