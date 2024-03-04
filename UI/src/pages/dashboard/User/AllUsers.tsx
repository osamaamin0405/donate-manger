import { Typography, Table, Button, Space, InputRef } from "antd";
import { Link } from "react-router-dom";
import { useMemo, useRef, useState, useEffect } from 'react';
import { getUsers } from "../../../api/user";
import getColumnSearchProps from "../../../components/utils/TableSearch";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { getGender } from "../../../Constance";

export default function AllCases(){

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);
    const [tableData, setTableData] = useState([]);
    const [isLoading, setLoading]  = useState(true);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const perPage = 20,
    {t} = useTranslation();
    useEffect(()=>{
        getUsers(page, perPage, ((searchedColumn!='' && searchText != undefined) ? `${searchedColumn}/${searchText}`: '')).
        then((res)=>{
            setLoading(false);
            setTotal(res.data.total);
            setTableData(res.data.data);
        })
        .catch(()=>{
            setLoading(false);
        });
    }, [page, searchedColumn]);
    const tableColumns = useMemo(()=>[
        {
            title: t('full name'),
            dataIndex: 'fname',
            render: (text: string, record:any)=>{
                return text + ' ' + record.lname;
            },
            sorter:(a:any,b:any)=>a.fname[0].charCodeAt() - b.fname[1].charCodeAt(),
            // ...getColumnSearchProps('fname', searchText, setSearchText, searchedColumn, setSearchedColumn, searchInput),
        },
        {
            title: t("username"),
            dataIndex: 'username',
            sorter:(a:any,b:any)=>a.name[0].charCodeAt() - b.name[1].charCodeAt(),
            ...getColumnSearchProps('username', searchText, setSearchText, searchedColumn, setSearchedColumn, searchInput),
        },
        {
            title: "Phone",
            dataIndex: "phone"
        },
        {
            title: t("email"),
            dataIndex: "email",
            ...getColumnSearchProps('email', searchText, setSearchText, searchedColumn, setSearchedColumn, searchInput),
        },
        {
            title: t("gender"),
            dataIndex: "gender",
            ...getColumnSearchProps('gender', searchText, setSearchText, searchedColumn, setSearchedColumn, searchInput),
            onFilter(value, record){
                setSearchText(value.toString().toLowerCase() == t("male").toLowerCase() ? "1" : "2");
                return record['gender'].toString().toLowerCase().includes(value.toString().toLowerCase() == t("male").toLowerCase() ? "1" : "2")
            },
            render(value:any){
                //@ts-ignore
                return getGender[value as number];
            }
        },
        {
            title: t("actions"),
            dataIndex: "_id",
            render: (id: string)=>{
                return (
                    <Space>
                        <Button type='primary'>
                            <Link to={`/user/info/${id}`}>{t("more")}</Link>
                        </Button>
                        <Button type='default'> 
                            <Link to={`/user/edit/${id}`}>{t("edit")}</Link>
                        </Button>
                    </Space>
                );
            },
            width: "10%"
        }
    ], []);
    return (
        <>
            <Helmet>
                <title>{t("all users")}</title>
            </Helmet>
            <Typography.Title className='text-center'>{t("all users")}</Typography.Title>
            <br/>
            <Table 
            pagination={{total: total, defaultPageSize: perPage, defaultCurrent: page, 
                onChange(page){
                    setPage(page);
                }
            }}  
            rowKey={(record)=>record._id} loading={isLoading} bordered columns={tableColumns} dataSource={tableData}/>
        </>
    );
}