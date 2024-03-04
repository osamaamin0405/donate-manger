import {ButtonStyle, IconStyle} from "./styles.ts";
import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import {toggleSidebar} from "../../store/appSlice/appSlice.ts";
import {Button} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {CollapseSelector, isAuthSelector} from "../../store/index.ts";
import {HTMLProps} from "react";
export const HeaderLeft = (props: HTMLProps<HTMLDivElement>) => {
	const isOpen = useSelector(CollapseSelector);
	const dispatch = useDispatch(),
		isLogin = useSelector(isAuthSelector);
	return (
		<div {...props}>
			{isLogin && <Button
				style={ButtonStyle}

				icon={
					isOpen ? <MenuUnfoldOutlined style={IconStyle}/> : <MenuFoldOutlined style={IconStyle}/>
				}
				onClick={() => dispatch(toggleSidebar())}
			></Button>}
		</div>
	)
}