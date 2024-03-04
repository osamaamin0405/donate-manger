import { HomeOutlined, PlusOutlined, TableOutlined, UserAddOutlined, UserOutlined } from "@ant-design/icons";
import i18next from "i18next";
import { FaHandHoldingHeart } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";
import { MdCategory } from "react-icons/md";
import {NavLink} from "react-router-dom";

const t = i18next.t;

const sidebarLinks = [
    {
        key: 1,
        path: "/",
        title: t("home"),
        icon: <HomeOutlined/>,
        label: <NavLink end to='/'>{t('home')}</NavLink>
    },
    {
        key: 2,
        title: t("person"),
        icon: <FaPerson/>,
        label: t("persons"),
        children:[
            {
                key: '2-1',
                label: (<NavLink to='/case/add'>{t("add")}</NavLink>),
                icon: <PlusOutlined/>,
                title: t("add case"),
                path: "/case/add"
            },
            {
                key: '2-2',
                label: (<NavLink to='/case/all'>{t('all')}</NavLink>),
                icon: <TableOutlined/>,
                title: t("all"),
                path: "/case/all",
            }
        ]
    },
    {
        key: 3,
        title: t("users"),
        icon: <UserOutlined/>,
        label: t("users"),
        children:[
            {
                key: '3-1',
                label: (<NavLink to='/user/add'>{t("add")}</NavLink>),
                icon: <UserAddOutlined/>,
                title: t("add user"),
                path: "/user/add"
            },
            {
                key: '3-2',
                label: (<NavLink to='/user/all'>{t("all")}</NavLink>),
                icon: <TableOutlined/>,
                title: t("all"),
                path: "/user/all",
            }
        ]
    },
    {
        key: 4,
        title: t("category"),
        icon: <MdCategory/>,
        label: t("category"),
        children:[
            {
                key: '4-1',
                label: (<NavLink to='/category/add'>{t("add")}</NavLink>),
                icon: <PlusOutlined/>,
                title: t("add category"),
                path: "/category/add"
            },
            {
                key: '4-2',
                label: (<NavLink to='/category/all'>{t("all")}</NavLink>),
                icon: <TableOutlined/>,
                title: t("all"),
                path: "/category/all",
            }
        ]
    },
    {
        key: 5,
        title: t("donations"),
        icon: <FaHandHoldingHeart/>,
        label: t("donations"),
        children:[
            // {
            //     key: '5-1',
            //     label: (<NavLink to='/fund/add'>Add</NavLink>),
            //     icon: <PlusOutlined/>,
            //     title: "Add Case",
            //     path: "/user/add"
            // },
            {
                key: '5-2',
                label: (<NavLink to='/donation/all'>{t("all")}</NavLink>),
                icon: <TableOutlined/>,
                title: t("all"),
                path: "/donation/all",
            }
        ]
    }
]

export default sidebarLinks;