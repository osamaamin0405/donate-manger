import { SearchOutlined } from '@ant-design/icons';
import type { InputRef, TableColumnType } from 'antd';
import { Button, Input, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { FilterDropdownProps } from 'antd/es/table/interface';
import { RefObject } from 'react';

const getColumnSearchProps = (dataIndex: any,
            searchText: string,
            setSearchText: CallableFunction,
            searchedColumn: string,
            setSearchedColumn: CallableFunction,
            searchInput: RefObject<InputRef>,
            type:string = 'text'): TableColumnType<any> => {

    // handleSearch, handleReset, searchInput, setSearchText, setSearchedColumn, searchedColumn, searchText;

    const handleSearch = (selectedKeys: string[],confirm: FilterDropdownProps['confirm'],dataIndex: any) => {
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
        confirm();
    };

    const handleReset = (clearFilters: () => void) => {
        setSearchText('');
        setSearchedColumn('');
        clearFilters();
    };

    return {
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
                <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                    {type == 'Date' ? (
                        <Input
                        type='date'
                        ref={searchInput}
                        placeholder={`Search ${dataIndex}`}
                        value={selectedKeys[0]}
                        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => {clearFilters && handleReset(clearFilters);handleSearch(selectedKeys as string[], confirm, dataIndex)}}
                        style={{ marginBottom: 8, display: 'block' }} />
                    ) : (<Input
                        ref={searchInput}
                        placeholder={`Search ${dataIndex}`}
                        value={selectedKeys[0]}
                        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => {clearFilters && handleReset(clearFilters);handleSearch(selectedKeys as string[], confirm, dataIndex)}}
                        style={{ marginBottom: 8, display: 'block' }}
                    />)}
                    <Space>
                        <Button
                            type="primary"
                            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                            icon={<SearchOutlined />}
                            size="small"
                            style={{ width: 90 }}
                        >
                            Search
                        </Button>
                        <Button
                            onClick={() => clearFilters && handleReset(clearFilters)}
                            size="small"
                            style={{ width: 90 }}
                        >
                            Reset
                        </Button>
                        <Button
                            type="link"
                            size="small"
                            onClick={() => {
                                setSearchText((selectedKeys as string[])[0]);
                                setSearchedColumn(dataIndex);
                                confirm({ closeDropdown: false });
                            }}
                        >
                            Filter
                        </Button>
                        <Button
                            type="link"
                            size="small"
                            onClick={() => {
                                close();
                            }}
                        >
                            close
                        </Button>
                    </Space>
                </div>
            ),
            filterIcon: (filtered: boolean) => (
                <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
            ),
            onFilter: (value, record) =>
                record[dataIndex]
                    .toString()
                    .toLowerCase()
                    .includes((value as string).toLowerCase()),
            onFilterDropdownOpenChange: (visible) => {
                if (visible) {
                    setTimeout(() => searchInput.current?.select(), 100);
                }
            },
            render: (text) =>
                searchedColumn === dataIndex ? (
                    <Highlighter
                        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                        searchWords={[searchText]}
                        autoEscape
                        textToHighlight={text ? text.toString() : ''}
                    />
                ) : (text),
        }
}


export default getColumnSearchProps;