import { OnSortPropsInterface } from '../components/Table';

export type GenderType = 'female' | 'male';

export interface UserDataInterface {
  gender: GenderType;
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  login: {
    username: string;
  };
  registered: {
    date: Date;
    age: 6;
  };
}

export interface FilterInterface extends OnSortPropsInterface {
  keyword?: string;
  gender: GenderType | 'All';
  page: number;
  results: number;
}
