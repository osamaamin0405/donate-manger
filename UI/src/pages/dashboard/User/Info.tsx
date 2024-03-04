import { Helmet } from "react-helmet";
import {  Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';
import { useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import { getGender, getRole, getStatus } from "../../../Constance";
import { getUser } from "../../../api/user";
import { useSelector } from "react-redux";
import { userSelector } from "../../../store";
import { useTranslation } from "react-i18next";


export default function More() {
    const user = useSelector(userSelector)
    const [info, setInfo] = useState(
        {
            _id:"",
            fname: "",
            lname: "",
            username: "",
            email: "",
            phone: "",
            gender: "",
            role: "",
            created_at: "",
            status: "",
            
        }
    ),
        { id } = useParams(),
        navigate = useNavigate(),
        {t} = useTranslation();

    
    useEffect(() => {
        let newID = id;
        //@ts=ignore
        if(newID == "me") newID = user._id
        getUser((newID as string))
            .then(res => {
                if(res.data.user == null) return navigate("/error/404")
                setInfo(res.data.user)
            })
            .catch(() => {
                navigate("/error/404")
            })
    }, [])

    const items: DescriptionsProps['items'] = [
        {
            label: t('first name'),
            children: (
                <span className="capitalize">{info.fname}</span>
            ),
        },
        {
            label: t('last name'),
            children: (
                <span className="capitalize">{info.lname}</span>
            ),
        },
        {
            label: t('created at'),
            children: new Date(info.created_at).toLocaleString(),
        },
        {
            label: t("email"),
            children: info.email,
        },
        {
            label: t("role"),
            //@ts-ignore
            children: getRole[info.role],
        },
        {
            label: t("gender"),
            //@ts-ignore
            children: getGender[info.gender]
        },
        {
            label: t("status"),
            //@ts-ignore
            children: getStatus[info.status]
        }
    ];
    return (
        <>
            <Helmet>
                <title>Case Info | {info.username}</title>
            </Helmet>
            {info._id &&
                <>
                    <Descriptions
                        title={id == 'me'? t("account info") : t("user info")}
                        bordered
                        column={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
                        items={items}
                    />
                </>
            }
        </>
    )

}