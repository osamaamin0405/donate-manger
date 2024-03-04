import { Helmet } from "react-helmet";
import { Descriptions, Divider, Space, Image, Empty } from 'antd';
import type { DescriptionsProps } from 'antd';
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { userSelector } from "../../../store";
import { getDonation } from "../../../api/Donation";
import { useTranslation } from "react-i18next";


export default function More() {
    const user = useSelector(userSelector)
    const [info, setInfo] = useState(
        {
            "_id": "",
            "number": "",
            "value": "",
            "note": "",
            "docs": [],
            "case": {
                _id: "",
                name: ""
            },
            "category": {
                category_name: ""
            },
            "created_user": {
                _id: "",
                username: ""
            },
            "created_at": "",
        }
    ),
        { id } = useParams(),
        navigate = useNavigate(),
        {t} = useTranslation();


    useEffect(() => {
        let newID = id;
        //@ts=ignore
        if (newID == "me") newID = user._id
        getDonation((newID as string))
            .then(res => {
                if(res.data.donation == null) return navigate("/error/404")
                setInfo(res.data.donation)
            })
            .catch(() => {
                navigate("/error/404")
            })
    }, [])

    const items: DescriptionsProps['items'] = [
        {
            label: t("donation number"),
            children: info.number,
        },
        {
            label: t("value"),
            children: info.value,
        },
        {
            label: t("category"),
            children: info.category.category_name,
        },
        {
            label: t("created at"),
            children: new Date(info.created_at).toLocaleString(),
        },
        {
            label: t("notes"),
            children: info.note,
        },
        {
            label: t("case name"),
            children: (
                <Link to={`/case/info/${info.case._id}`}>{info.case.name}</Link>
            ),
        },
        {
            label: t("created user"),
            children: (
                <Link to={`/user/info/${info.created_user._id}`}>{info.created_user.username}</Link>
            ),
        },
    ];
    return (
        <>
            <Helmet>
                <title>{t("donation info")} | {`${info.number}`}</title>
            </Helmet>
            {info._id &&
                <>
                    <Descriptions
                        title={t("donation info")}
                        bordered
                        column={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
                        items={items}
                    />
                    <Divider>{t("donation docs")}</Divider>
                    {info.docs.length != 0 ?
                        (
                            <Space size={12}>
                            {
                                info.docs.map((src) => {
                                    return (
                                        <Image
                                            key={src}
                                            width={200}
                                            src={`${process.env.REACT_APP_API_BASE_URL}/${src}`}
                                            placeholder={
                                                <Image
                                                    preview={false}
                                                    src={`${process.env.REACT_APP_API_BASE_URL}/${src}`}
                                                    width={200}
                                                />
                                            }
                                        />
                                    )
                                })

                            }
                        </Space>
                        ):
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    }

                </>
            }

        </>
    )

}