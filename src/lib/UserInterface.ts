import { Department, Designation, PageMeta, Role } from "./commonInterfaces";

export interface UserPageData {
  pagedata: {
    data: UserData[];
    meta: PageMeta;
  };
  roles: Role[];
  departments: Department[];
  designations: Designation[];
}

export interface UserData {
  id: string;
  username: string;
  email: string;
  employee_id: string;
  phone: string;
  tel_ext: string;
  name: string;
  is_active: boolean;
  roles: Role[];
  department: Department;
  designation: Designation;
}
