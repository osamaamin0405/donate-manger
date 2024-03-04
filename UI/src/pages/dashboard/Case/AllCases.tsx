import { Typography, Table, Button, Space, InputRef } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useMemo, useRef, useState, useEffect } from 'react';
import { getAllCasesTable } from "../../../api/caseApi";
import getColumnSearchProps from "../../../components/utils/TableSearch";
import ExportTable from "../../../components/utils/ExportTable";
import FormModal from "../../../components/modals/formModals/FormModal";
import { FundForm } from "../../../Forms/Fund.form";
import { calculateAge } from "../../../utils/helpers";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { getGender } from "../../../Constance";

export default function AllCases() {
    const navigate = useNavigate(),
        [searchText, setSearchText] = useState(''),
        [searchedColumn, setSearchedColumn] = useState(''),
        searchInput = useRef<InputRef>(null),
        [tableData, setTableData] = useState([]),
        [isLoading, setLoading] = useState(true),
        [page, setPage] = useState(1),
        [total, setTotal] = useState(0),
        [rowSelectedKeys, setRowSeleted] = useState<any[]>(),
        [rowSelectedData, setRowSelectedData] = useState<any[]>(),
        [isSelected, setSelected] = useState(false),
        perPage = 50,
        {t} = useTranslation();

    useEffect(() => {
        getAllCasesTable(page, perPage, ((searchedColumn != '' && searchText != undefined) ? `${searchedColumn}/${searchText}` : '')).
            then((res) => {
                setLoading(false);
                setTotal(res.data.total);
                setTableData(res.data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    }, [page, searchedColumn]);
    const tableColumns = useMemo(() => [
        {
            title: t('person name'),
            dataIndex: 'name',
            sorter: (a: any, b: any) => a.name[0].charCodeAt() - b.name[0].charCodeAt(),
            ...getColumnSearchProps('name', searchText, setSearchText, searchedColumn, setSearchedColumn, searchInput),
        },
        {
            title: t('age'),
            dataIndex: 'dob',
            sorter: (a: any, b: any) => new Date(a.dob).getDate() - new Date(b.dob).getDate(),
            render: (text: string) => {
                return calculateAge(new Date(text));
            }
        },
        {
            title: t('national id'),
            dataIndex: 'national_id',
            ...getColumnSearchProps('national_id', searchText, setSearchText, searchedColumn, setSearchedColumn, searchInput),
        },
        {
            title: t("address"),
            dataIndex: "address",
        },
        {
            title: t("phone"),
            dataIndex: "phone",
            ...getColumnSearchProps('phone', searchText, setSearchText, searchedColumn, setSearchedColumn, searchInput),
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
            title: "ID",
            dataIndex: "_id",
            ...getColumnSearchProps('_id', searchText, setSearchText, searchedColumn, setSearchedColumn, searchInput),
        },
        {
            title: t("actions"),
            dataIndex: "_id",
            ExportDisable: true,
            render: (id: string) => {
                return (
                    <Space>
                        <Button type='primary' >
                            <Link to={`/donation/add/${id}`}>{t("give help")}</Link>
                        </Button>
                        <Button>
                            <Link to={`/case/info/${id}`}>{t("more")}</Link>
                        </Button>
                        <Button type="dashed">
                            <Link to={`/case/edit/${id}`}>{t("edit")}</Link>
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
                <title>All Persons</title>
            </Helmet>
            <Typography.Title className='text-center'>{t("all persons")}</Typography.Title>
            <br />
            <ExportTable fileName="case" columns={tableColumns} data={tableData}></ExportTable>
            <br />
            {isSelected &&
                <Space>
                    <FormModal formSchema={FundForm}
                        onOk={async (dispatch, form) => {
                            dispatch("loading");
                            form.validateFields().then(values => {
                                navigate(`/donation/review/${rowSelectedKeys?.join(",")}`, {
                                    state: {
                                        formValues: values,
                                        rowSelectedData,
                                    }
                                })
                                dispatch("close");
                            }).catch(() => {
                                dispatch("loaded");
                            })
                        }}
                        button={<Button type="primary">{t("give help")}</Button>}
                        initialValues={{
                            fund_number: Math.floor(Math.random() * 1000000),
                        }}
                    />
                    <Button onClick={()=>{
                        navigate(`/case/cards/`, {
                            state: {
                                rowSelectedData,
                            }
                        })
                    }}>{t("create cards")}</Button>
                </Space>
            }
            <Table
                className="mt-4"
                pagination={{
                    total: total, defaultPageSize: perPage, defaultCurrent: page,
                    onChange(page) {
                        setPage(page);
                    },
                    showTotal: (total) => `${page} / ${Math.ceil(total / perPage)}`
                }}
                rowKey={(record) => record._id} loading={isLoading} rowSelection={{
                    onChange(seletedRowsKeys, selectedRows) {
                        setSelected(seletedRowsKeys.length != 0);
                        setRowSeleted(seletedRowsKeys);
                        setRowSelectedData(selectedRows);
                        // console.log(seletedRowsKeys, rowSelected);
                    }
                }} bordered columns={tableColumns} dataSource={tableData} />
        </>
    );
}