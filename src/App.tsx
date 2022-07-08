import './index.css';
import { InputGroup, InputSelectGroup, Pagination, Table } from './components';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import {
  columns,
  defaultFilter,
  defaultPagination,
  genderOptions,
} from './constants/App';
import { useCallback, useEffect, useState } from 'react';
import {
  FilterInterface,
  GenderType,
  UserDataInterface,
} from './interfaces/AppInterfaces';
import { objToUrlParam } from './utils/objToUrlParam';
import useDebounce from './hooks/useDebounce';
import { OnSortPropsInterface } from './components/Table';

function App() {
  const [tableData, setTableData] = useState<Array<UserDataInterface>>([]);
  const [filterParams, setFilterParams] = useState<FilterInterface>({
    ...defaultFilter,
    ...defaultPagination,
  });
  const [searchKeyword, setSearchKeyword] = useState(null);
  const debouncedSearchKeyword = useDebounce(searchKeyword, 500);

  useEffect(() => {
    fetchData();
  }, [filterParams]);

  // fetching data when filter state change
  const fetchData = useCallback(async () => {
    const paramsTmp = { ...filterParams };
    if (filterParams.gender === 'All') delete paramsTmp.gender;
    if (!filterParams.keyword) delete paramsTmp.keyword;
    if (!filterParams.sortBy) {
      delete paramsTmp.sortBy;
      delete paramsTmp.order;
    }

    const searchParam = objToUrlParam(paramsTmp);

    try {
      const res = await fetch('https://randomuser.me/api/?' + searchParam);
      if (res.ok && res.status === 200) {
        const { results } = await res.json();
        setTableData(results);
      } else {
        throw new Error(String(res.status));
      }
    } catch (error) {
      alert(error);
    }
  }, [filterParams]);

  const handleOnSort = (props: OnSortPropsInterface) => {
    setFilterParams((oldValue) => ({ ...oldValue, ...props }));
  };
  //handling search input with debounce
  useEffect(() => {
    if (
      debouncedSearchKeyword !== null &&
      debouncedSearchKeyword !== filterParams.keyword
    ) {
      setFilterParams((oldValue) => ({
        ...oldValue,
        keyword: debouncedSearchKeyword,
      }));
    }
  }, [debouncedSearchKeyword]);

  return (
    <div className="App p-4">
      <header className="header">simple pagination</header>
      <div className="my-4">
        <div className="d-flex align-items-end gap-2">
          <InputGroup
            label="Search"
            value={searchKeyword || ''}
            onChange={({ target }) => setSearchKeyword(target?.value)}
          />
          <InputSelectGroup
            label="Gender"
            value={filterParams.gender}
            options={genderOptions}
            onChange={({ target }) =>
              setFilterParams({
                ...filterParams,
                gender: target.value as GenderType,
              })
            }
          />
          <button
            className="btn btn-light"
            onClick={() => {
              setFilterParams((oldv) => ({
                ...oldv,
                ...defaultFilter,
              }));
              setSearchKeyword(null);
            }}>
            Reset Filter
          </button>
        </div>
      </div>
      <div>
        <Table
          data={tableData}
          columns={columns}
          handleOnSort={handleOnSort}
          keyField="email"
        />
        <div className="float-end">
          <Pagination
            currentPage={filterParams.page}
            onClickChange={(page) => setFilterParams((v) => ({ ...v, page }))}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
