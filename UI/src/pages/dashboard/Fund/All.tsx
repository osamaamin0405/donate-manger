import { Typography, Table, Button, Space, InputRef } from "antd";
import { Link } from "react-router-dom";
import { useMemo, useRef, useState, useEffect } from 'react';
import getColumnSearchProps from "../../../components/utils/TableSearch";
import ExportTable from "../../../components/utils/ExportTable";
import { getDonations } from "../../../api/Donation";
import { Helmet } from "react-helmet";
import { t } from "i18next";

type x = {scroll:boolean}

export default function AllDonations({scroll}: x){
    // const navigate = useNavigate(),
    const   [searchText, setSearchText] = useState(''),
            [searchedColumn, setSearchedColumn] = useState(''),
            searchInput = useRef<InputRef>(null),
            [tableData, setTableData] = useState([]),
            [isLoading, setLoading]  = useState(true),
            [page, setPage] = useState(1),
            [total, setTotal] = useState(0),
    // [rowSelectedKeys, setRowSeleted] = useState<any[]>(),
    // [rowSelectedData, setRowSelectedData] = useState<any[]>(),
    // [isSelected, setSelected] = useState(false),
    perPage = 50
    useEffect(()=>{
        getDonations(page, perPage, ((searchedColumn!='' && searchText != undefined) ? `${searchedColumn}/${searchText}`: '')).
        then((res)=>{
            setLoading(false);
            setTotal(res.data.total);
            setTableData(res.data.data);
        })
        .catch(()=>{
            setLoading(false);
        });
    }, [page, searchText]);

    const tableColumns = useMemo(()=>[
        {
            title: t("donation number"),
            dataIndex: 'number',
            sorter:(a:any,b:any)=>a.number - b.number,
            ...getColumnSearchProps('number', searchText, setSearchText, searchedColumn, setSearchedColumn, searchInput),
        },
        {
            title: t("value"),
            dataIndex: 'value',
            sorter:(a:any,b:any)=>parseFloat(a.value)-parseFloat(b.value),
            ...getColumnSearchProps('value', searchText, setSearchText, searchedColumn, setSearchedColumn, searchInput),
        },
        {
            title: t('category'),
            dataIndex: 'category',
            ...getColumnSearchProps('category', searchText, setSearchText, searchedColumn, setSearchedColumn, searchInput),
            //overedie on Filter
            onFilter(value:any, record:any){
                //@ts-ignore
                return record['category']['category_name'].toString()
                .toLowerCase()
                .includes((value as string).toLowerCase())
            },
            render(value){
                return value.category_name
            }
        },
        {
            title: t("notes"),
            dataIndex: "note",
            ...getColumnSearchProps('note', searchText, setSearchText, searchedColumn, setSearchedColumn, searchInput),
        },
        {
            title: t("case name"),
            dataIndex: "case",
            ...getColumnSearchProps('case', searchText, setSearchText, searchedColumn, setSearchedColumn, searchInput),
            onFilter(value:any, record:any){
                //@ts-ignore
                return record['case']['name'].toString()
                .toLowerCase()
                .includes((value as string).toLowerCase())
            },
            render(value:any){
                return value.name
            }
        },
        {
            title: t("created user"),
            dataIndex: "created_user",
            ...getColumnSearchProps('case', searchText, setSearchText, searchedColumn, setSearchedColumn, searchInput),
            onFilter(value:any, record){
                //@ts-ignore
                return record['created_user']['username'].toString()
                .toLowerCase()
                .includes((value as string).toLowerCase());
                
            },
            render(value:any)
            {
                return value.username
            }
        },
        {
            title: t("created at"),
            dataIndex: "created_at",
            ...getColumnSearchProps('created_at', searchText, setSearchText, searchedColumn, setSearchedColumn, searchInput, 'Date'),
            onFilter(value: any, record: any){
                return new Date(record['created_at']).toLocaleString().includes(new Date(value).toLocaleDateString());
            },
            render(value){
                return new Date(value).toLocaleString();
            }
        },
        {
            title: t("actions"),
            dataIndex: "_id",
            ExportDisable: true,
            render: (id: string)=>{
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

    return (
        <>
        <Helmet>
            <title>{t("all donations")}</title>
        </Helmet>
        <Typography.Title className='text-center'>{t("all donations")}</Typography.Title>
        <br/>
        <ExportTable fileName="case" columns={tableColumns} data={tableData}></ExportTable>
        <br/>
        <Table 
            className="mt-4"
            pagination={{total: total, defaultPageSize: perPage, defaultCurrent: page, 
                onChange(page){
                    setPage(page);
                },
                showTotal:(total) => `${page} / ${Math.ceil(total / perPage)}`
            }}  
        rowKey={(record)=>record._id} loading={isLoading} rowSelection={{
            // onChange(seletedRowsKeys, selectedRows){
            //     // setSelected(seletedRowsKeys.length != 0);
            //     // setRowSeleted(seletedRowsKeys);
            //     // setRowSelectedData(selectedRows);
            //     // console.log(seletedRowsKeys, rowSelected);
            // }
        }} bordered columns={tableColumns} dataSource={tableData} scroll={scroll ? {y:300}: {}}/>
    </>
    )
}