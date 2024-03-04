import {MenuProps} from "antd";
import {DropLink} from "../components/utils/DropLink.tsx";
import {EditOutlined, InfoCircleOutlined, LogoutOutlined} from "@ant-design/icons/lib/icons";
import i18next from "i18next";


const t = i18next.t;

const items: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <DropLink to="/auth/logout">
                <LogoutOutlined />
                {t("logout")}
            </DropLink>
        )
    },
    {
        key: '2',
        label: (
            <DropLink to="/user/info/me">
                <InfoCircleOutlined/>
                {t("info")}
            </DropLink>
        )
    },
    {
        key: '3',
        label: (
            <DropLink to="/user/edit/me">
                <EditOutlined/>
                {t("edit")} {t("account")}
            </DropLink>
        )
    },
];


export default items;