import { Typography, Table, Button, Space, InputRef } from "antd";
import { Link } from "react-router-dom";
import { useMemo, useRef, useState, useEffect } from 'react';
import { getAllCategory } from "../../../api/category";
import getColumnSearchProps from "../../../components/utils/TableSearch";
// import { calculateAge } from "../../../utils/helpers";
import ExportTable from "../../../components/utils/ExportTable";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

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
        getAllCategory(page, perPage, ((searchedColumn!='' && searchText != undefined) ? `${searchedColumn}/${searchText}`: '')).
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
            title: t("category name"),
            dataIndex: 'category_name',
            sorter:(a:any,b:any)=>a.category_name[0].charCodeAt() - b.category_name[1].charCodeAt(),
            ...getColumnSearchProps('category_name', searchText, setSearchText, searchedColumn, setSearchedColumn, searchInput),
        },
        {
            title: t("category description"),
            dataIndex: "description"
        },
        {
            title: t("show report status"),
            dataIndex: "show_report_card",
            ExportDisable: true,
            render(value: boolean){
                return value ? t('visiable'): t("hidden");
            }
        },
        {
            title: t("actions"),
            dataIndex: "_id",
            ExportDisable: true,
            render: (id: string)=>{
                return (
                    <Space>
                        <Button type='default'> 
                            <Link to={`/category/edit/${id}`}>{t("edit")}</Link>
                        </Button>
                    </Space>
                );
            },
            width: "4%"
        }
    ], []);
    return (
        <>
            <Helmet>
                <title>{t("all categories")}</title>
            </Helmet>
            <Typography.Title className='text-center'>{t("all categories")}</Typography.Title>
            <br/>
            <ExportTable fileName="case" columns={tableColumns} data={tableData}></ExportTable>
            <br/>
            <Table 
                pagination={{total: total, defaultPageSize: perPage, defaultCurrent: page, 
                    onChange(page){
                        setPage(page);
                    },
                    showTotal:(total) => `${page} / ${Math.ceil(total / perPage)}`
                }}  
            rowKey={(record)=>record._id} loading={isLoading} bordered columns={tableColumns} dataSource={tableData}/>
        </>
    );
}