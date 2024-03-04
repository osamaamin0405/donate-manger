import { Helmet } from "react-helmet";
import { Button, Descriptions, Divider, Space, Table, Image, Empty } from 'antd';
import type { DescriptionsProps, InputRef } from 'antd';
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { getGender, getMaritalStatus } from "../../../Constance";
import getColumnSearchProps from "../../../components/utils/TableSearch";
import { useTranslation } from "react-i18next";


export default function More() {
    const [info, setInfo] = useState(
        {
            "_id": '',
            image:"",
            "name": "",
            "national_id": "",
            "phone": "",
            "address": "",
            "dob": "",
            "marital_status": 1,
            "gender": 1,
            "id_photo": [],
            "created_at": "",
            "created_user": [
                { fname: "", lname: "", _id: "" }
            ],
            "status": 1,
            "deleted": 0,
            "__v": 0,
            "donations": [
                {
                    "_id": "",
                    "number": null,
                    "value": "",
                    "note": "",
                    "docs": [],
                    "case": "",
                    "category": "",
                    "created_user": "",
                    "created_at": "",
                    "__v": 0
                }
            ]
        }
    ),
        { id } = useParams(),
        [searchText, setSearchText] = useState(''),
        [searchedColumn, setSearchedColumn] = useState(''),
        searchInput = useRef<InputRef>(null),
        navigate = useNavigate(),
        {t} = useTranslation();

    useEffect(() => {
        axios.get(`/case/info/${id}`)
            .then(res => {
                if(res.data.data == null) return navigate("/error/404")
                setInfo(res.data.data)
            })
            .catch(() => {
                navigate("/error/404")
            })
    }, [])

    const tableColumns = useMemo(() => [
        {
            title: t("donation number"),
            dataIndex: 'number',
            sorter: (a: any, b: any) => a.number - b.number,
            ...getColumnSearchProps('number', searchText, setSearchText, searchedColumn, setSearchedColumn, searchInput),
        },
        {
            title: t("value"),
            dataIndex: 'value',
            sorter: (a: any, b: any) => parseFloat(a.value) - parseFloat(b.value),
            ...getColumnSearchProps('value', searchText, setSearchText, searchedColumn, setSearchedColumn, searchInput),
        },
        {
            title: t("category"),
            dataIndex: 'category',
            ...getColumnSearchProps('category', searchText, setSearchText, searchedColumn, setSearchedColumn, searchInput),
            //overedie on Filter
            onFilter(value: any, record: any) {
                //@ts-ignore
                return record['category'][0]['category_name'].toString()
                    .toLowerCase()
                    .includes((value as string).toLowerCase())
            },
            render(value) {
                return value[0].category_name
            }
        },
        {
            title: t("notes"),
            dataIndex: "note",
            ...getColumnSearchProps('note', searchText, setSearchText, searchedColumn, setSearchedColumn, searchInput),
        },
        {
            title: t("created at"),
            dataIndex: "created_at",
            ...getColumnSearchProps('created_at', searchText, setSearchText, searchedColumn, setSearchedColumn, searchInput, 'Date'),
            onFilter(value: any, record: any) {
                return new Date(record['created_at']).toLocaleString().includes(new Date(value).toLocaleDateString());
            },
            render(value) {
                return new Date(value).toLocaleString();
            }
        },
        {
            title: t("actions"),
            dataIndex: "_id",
            ExportDisable: true,
            render: (id: string) => {
                return (
                    <Space>
                        <Button type="primary">
                            <Link to={`/donation/info/${id}`}>{t("more")}</Link>
                        </Button>
                        <Button type="default" className="bg-red-500 hover:bg-red-400">
                            <Link to={`/donation/edit/${id}`}>{t("edit")}</Link>
                        </Button>
                    </Space>
                );
            },
            width: "10%"
        }
    ], []);


    const items: DescriptionsProps['items'] = [
        {
            label: t("person image"),
            children: (
                <Image width={50} src={`${process.env.REACT_APP_API_BASE_URL}/${info?.image}`}>
                    {info.name.slice(0,2)}
                </Image>
            ),
        },
        {   
            label: t("ID"),
            children: info._id,
        },
        {
            label: t("name"),
            children: info.name,
        },
        {
            label: t("phone number"),
            children: info.phone,
        },
        {
            label: t("dob"),
            children: new Date(info.dob).toLocaleString().split(",")[0],
        },
        {
            label: t("address"),
            children: info.address,
        },
        {
            label: t('national id'),
            children: info.national_id,
        },
        {
            label: t("created at"),
            children: new Date(info.created_at).toLocaleString(),
        },
        {
            label: t("created user"),
            children: (<Link to={`/user/info/${info.created_user[0]._id}`}>
                <span className="capitalize">{info.created_user[0].fname}</span> <span className="capitalize">{info.created_user[0].lname}</span>
            </Link>),
            span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 },
        },
        {
            label: t("marital status"),
            //@ts-ignore
            children: getMaritalStatus[info.marital_status],
        },
        {
            label: t("gender"),
            //@ts-ignore
            children: getGender[info.gender]
        },
    ];
    return (
        <>
            <Helmet>
                <title> {t("person info")} | {info.name}</title>
            </Helmet>
            {info._id &&
                <>
                    <Descriptions
                        title={t("person info")}
                        bordered
                        column={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
                        items={items}
                    />
                    <Divider>
                        {t("all donations")}
                        {info && <> {info.name}</>}
                    </Divider>
                    <Table rowKey={(record) => record._id} columns={tableColumns} dataSource={info.donations} bordered></Table>
                    <Divider>{t("person docs")}</Divider>
                    {info.id_photo.length != 0 ?
                        (
                            <Space size={12}>
                            {
                                info.id_photo.map((src) => {
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