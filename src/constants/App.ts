import moment from 'moment';
import { ColumnDescription } from 'react-bootstrap-table-next';
import {
  FilterInterface,
  UserDataInterface,
} from '../interfaces/AppInterfaces';

export const columns: Array<ColumnDescription> = [
  {
    dataField: 'login.username',
    text: 'Username',
  },
  {
    dataField: 'name',
    text: 'Name',
    sort: true,
    classes: 'd-flex',
    formatter: (_, row: UserDataInterface) =>
      `${row.name.first} ${row.name.last}`,
  },
  {
    dataField: 'email',
    text: 'Email',
    sort: true,
  },
  {
    dataField: 'gender',
    text: 'Gender',
    sort: true,
  },
  {
    dataField: 'registered.date',
    text: 'Registered Date',
    sort: true,
    formatter: (cell) => (cell ? moment(cell).format('DD-MM-yyy HH:mm') : '-'),
  },
];
export const genderOptions = [
  { label: 'All', value: 'all' },
  { label: 'Female', value: 'female' },
  { label: 'Male', value: 'male' },
];
export const defaultFilter: Omit<FilterInterface, 'page' | 'results'> = {
  gender: 'All',
  keyword: '',
};

export const defaultPagination: Pick<FilterInterface, 'page' | 'results'> = {
  page: 1,
  results: 5,
};
