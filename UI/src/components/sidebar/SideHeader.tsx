import { Col, Image, Row, Typography} from "antd";
import {SidebarHeaderStyle, SidebarOpenLogoStyle, SidebarCloseLogoStyle} from "./SidebarStyle.ts";
import {useSelector} from "react-redux";
import {CollapseSelector, themeSelector} from "../../store/index.ts";
import {HTMLProps} from "react";
import { useTranslation } from "react-i18next";
// declare type SidebarHeaderProps = {
//     isCollapsed?: boolean
// }

export  default function SidebarHeader(props: HTMLProps<HTMLDivElement>): JSX.Element{
         const isCollapsed = useSelector(CollapseSelector),
            isDark = useSelector(themeSelector),
            ImageLogo = isDark ? "/assets/logo.png" : "/assets/logo.png",
            {t} = useTranslation();
        return (
            <div {...props}>
                <Row  style={SidebarHeaderStyle}>
                    <Col style={{textAlign:'center'}} span={24}>
                        <Image style={!isCollapsed ? SidebarOpenLogoStyle: SidebarCloseLogoStyle}   preview={false} src={ImageLogo}></Image>
                    </Col>
                    {!isCollapsed && 
                    <Col style={{textAlign:'center'}} span={24}>
                        <Typography.Title  level={3}>{t("orgnaize name")}</Typography.Title>
                    </Col>}
                </Row>
            </div>
        )
}