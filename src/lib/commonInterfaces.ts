export interface Role {
  id: string;
  name: string;
}

export interface Department {
  id: string;
  name: string;
}

export interface Designation {
  id: string;
  name: string;
}
export interface Language {
  id: string;
  name: string;
}
export interface MaterialType {
  id: string;
  name: string;
}
export interface Category {
  id: string;
  name: string;
}
export interface Publisher {
  id: string;
  name: string;
}
export interface Currency {
  id: string;
  name: string;
}

export interface PageMeta {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
export interface Location {
  id: string;
  name: string;
  address: string;
  created_at: string;
  updated_at: string;
  archived_at: string | null;
}
export interface Author {
  id: string;
  name: string;
}
export interface Distributor {
  id: string;
  name: string;
}
export interface Book {
  id: number;
  cover: string | null;
  pdf: string | null;
  acc_no: string;
  call_no: string;
  title: string;
  subTitle: string;
  author: string;
  subAuthor: string[];
  edition_no: string;
  version_no: string;
  volume_no: string;
  ddc_classification_no: string;
  accompanying_material: string;
  isbn_no: string;
  issn_no: string;
  publishing_year: number;
  publishing_date: string | null;
  date_of_purchase: string;
  price: number;
  total_pages: number;
  barcode: string;
  location_placed: string;
  description: string;
  created_at: string;
  updated_at: string;
  archived_at: string | null;
  is_available: boolean;
  donated_by: string | null;
  category: Category;
  publisher: Publisher;
  material_type: MaterialType;
  language: Language;
  location: Location;
  department: Department;
  distributer: Distributor;
  currency: Currency;
}
export interface Magazine {
  id: number;
  cover: string | null;
  pdf: string | null;
  acc_no: string;
  call_no: string;
  title: string;
  subTitle: string;
  author: string;
  subAuthor: string[];
  edition_no: string;
  version_no: string;
  volume_no: string;
  ddc_classification_no: string;
  accompanying_material: string;
  isbn_no: string;
  issn_no: string;
  publishing_year: number;
  publishing_date: string | null;
  date_of_purchase: string;
  price: number;
  total_pages: number;
  barcode: string;
  location_placed: string;
  description: string;
  created_at: string;
  updated_at: string;
  archived_at: string | null;
  is_available: boolean;
  donated_by: string | null;
  category: Category;
  publisher: Publisher;
  material_type: MaterialType;
  language: Language;
  location: Location;
  department: Department;
  distributor: Distributor;
  currency: Currency;
}
export interface Journal {
  id: number;
  cover: string | null;
  pdf: string | null;
  acc_no: string;
  call_no: string;
  title: string;
  subTitle: string;
  author: string;
  subAuthor: string[];
  edition_no: string;
  version_no: string;
  volume_no: string;
  ddc_classification_no: string;
  accompanying_material: string;
  isbn_no: string;
  issn_no: string;
  publishing_year: number;
  publishing_date: string | null;
  date_of_purchase: string;
  price: number;
  total_pages: number;
  barcode: string;
  location_placed: string;
  description: string;
  created_at: string;
  updated_at: string;
  archived_at: string | null;
  is_available: boolean;
  donated_by: string | null;
  category: Category;
  publisher: Publisher;
  material_type: MaterialType;
  language: Language;
  location: Location;
  department: Department;
  distributor: Distributor;
  currency: Currency;
}
export interface Novel {
  id: number;
  cover: string | null;
  pdf: string | null;
  acc_no: string;
  call_no: string;
  title: string;
  subTitle: string;
  author: string;
  subAuthor: string[];
  edition_no: string;
  version_no: string;
  volume_no: string;
  ddc_classification_no: string;
  accompanying_material: string;
  isbn_no: string;
  issn_no: string;
  publishing_year: number;
  publishing_date: string | null;
  date_of_purchase: string;
  price: number;
  total_pages: number;
  barcode: string;
  location_placed: string;
  description: string;
  created_at: string;
  updated_at: string;
  archived_at: string | null;
  is_available: boolean;
  donated_by: string | null;
  category: Category;
  publisher: Publisher;
  material_type: MaterialType;
  language: Language;
  location: Location;
  department: Department;
  distributor: Distributor;
  currency: Currency;
}
export interface Ebook {
  id: number;
  cover: string | null;
  pdf: string | null;
  acc_no: string;
  call_no: string;
  title: string;
  subTitle: string;
  author: string;
  subAuthor: string[];
  edition_no: string;
  version_no: string;
  volume_no: string;
  ddc_classification_no: string;
  accompanying_material: string;
  isbn_no: string;
  issn_no: string;
  publishing_year: number;
  publishing_date: string | null;
  date_of_purchase: string;
  price: number;
  total_pages: number;
  barcode: string;
  location_placed: string;
  description: string;
  created_at: string;
  updated_at: string;
  archived_at: string | null;
  is_available: boolean;
  donated_by: string | null;
  category: Category;
  publisher: Publisher;
  material_type: MaterialType;
  language: Language;
  department: Department;
  distributor: Distributor;
  currency: Currency;
}
export interface Asset {
  id: number;
  cover: string | null;
  pdf: string | null;
  acc_no: string;
  call_no: string;
  title: string;
  subTitle: string;
  author: string;
  subAuthor: string[];
  edition_no: string;
  version_no: string;
  volume_no: string;
  ddc_classification_no: string;
  accompanying_material: string;
  isbn_no: string;
  issn_no: string;
  publishing_year: number;
  publishing_date: string | null;
  date_of_purchase: string | null;
  price: number;
  total_pages: number;
  barcode: string;
  location_placed: string;
  description: string;
  created_at: string;
  updated_at: string;
  archived_at: string | null;
  is_available: boolean;
  donated_by: string | null;
  category: Category;
  publisher: Publisher;
  distributer: Distributor; // Adjust type as needed
  material_type: MaterialType;
  currency: Currency; // Adjust type as needed
  language: Language;
  location: Location;
  department: Department | null;
  created_by_user: {
    id: string;
    username: string;
    email: string;
    employee_id: string;
    phone: string;
    tel_ext: string;
    name: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    archived_at: string | null;
    is_validated: boolean;
    reset_password_code: string | null;
    reset_code_upto: string | null;
    login_token: string;
  };
  updated_by_user: { name: string } | null; // Adjust type as needed
  archived_by_user: { name: string } | null; // Adjust type as needed
}
export interface IssuingAsset {
  id: number;
  cover: string | null;
  pdf: string | null;
  acc_no: string;
  call_no: string;
  title: string;
  subTitle: string | null;
  author: string;
  subAuthor: string[] | null;
  edition_no: string;
  version_no: string;
  volume_no: string;
  ddc_classification_no: string;
  accompanying_material: string | null;
  isbn_no: string;
  issn_no: string;
  publishing_year: number;
  publishing_date: string | null;
  date_of_purchase: string | null;
  price: number;
  total_pages: number;
  barcode: string;
  location_placed: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  archived_at: Date | null;
  is_available: boolean;
  donated_by: string | null;
  category: Category;
}
export interface IssuedUser {
  id: string;
  username: string;
  email: string;
  phone: string;
  tel_ext: string | null;
  name: string;
  department: Department;
  designation: Designation;
}
export interface BorrowedItem {
  id: string;
  due_date: string;
  re_due_date: string;
  return_date: string | null;
  remarks_on_return_condition: string | null;
  fine_amount: number | null;
  create_at: string;
  updated_at: string;
  archived_at: string | null;
  re_issued: boolean;
  borrower: {
    id: string;
    username: string;
    email: string;
    employee_id: string;
    phone: string;
    tel_ext: string;
    name: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    archived_at: string | null;
    is_validated: boolean;
    reset_password_code: string | null;
    reset_code_upto: string | null;
    login_token: string | null;
    department: {
      id: string;
      name: string;
      created_at: string;
      updated_at: string;
      archived_at: string | null;
    };
  };
  issued_asset: {
    id: number;
    cover: string;
    pdf: string | null;
    acc_no: string;
    call_no: string;
    title: string;
    subTitle: string;
    author: string;
    subAuthor: string[];
    edition_no: string;
    version_no: string;
    volume_no: string;
    ddc_classification_no: string;
    accompanying_material: string;
    isbn_no: string;
    issn_no: string;
    publishing_year: number;
    publishing_date: string | null;
    date_of_purchase: string | null;
    price: number;
    total_pages: number;
    barcode: string;
    location_placed: string;
    description: string;
    created_at: string;
    updated_at: string;
    archived_at: string | null;
    is_available: boolean;
    donated_by: string | null;
    category: Category;
  };
  issued_by: {
    id: string;
    username: string;
    email: string;
    employee_id: string;
    phone: string;
    tel_ext: string;
    name: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    archived_at: string | null;
    is_validated: boolean;
    reset_password_code: string | null;
    reset_code_upto: string | null;
    login_token: string | null;
  };
}
export interface AssetReturn {
  id: string;
  borrower: {
    id: string;
    username: string;
    email: string;
    employee_id: string;
    phone: string;
    tel_ext: string;
    name: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    archived_at: string | null;
    is_validated: boolean;
    reset_password_code: string | null;
    reset_code_upto: string | null;
    login_token: string | null;
    department: {
      id: string;
      name: string;
      created_at: string;
      updated_at: string;
      archived_at: string | null;
    };
  };
  issued_asset: {
    id: number;
    cover: string;
    pdf: string | null;
    acc_no: string;
    call_no: string;
    title: string;
    subTitle: string;
    author: string;
    subAuthor: string[];
    edition_no: string;
    version_no: string;
    volume_no: string;
    ddc_classification_no: string;
    accompanying_material: string;
    isbn_no: string;
    issn_no: string;
    publishing_year: number;
    publishing_date: string | null;
    date_of_purchase: string | null;
    price: number;
    total_pages: number;
    barcode: string;
    location_placed: string;
    description: string;
    created_at: string;
    updated_at: string;
    archived_at: string | null;
    is_available: boolean;
    donated_by: string | null;
    category: {
      id: string;
      name: string;
      created_at: string;
      updated_at: string;
      archived_at: string | null;
    };
  };
  issued_by: {
    id: string;
    username: string;
    email: string;
    employee_id: string;
    phone: string;
    tel_ext: string;
    name: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    archived_at: string | null;
    is_validated: boolean;
    reset_password_code: string | null;
    reset_code_upto: string | null;
    login_token: string | null;
  };
  re_issued_by: {
    id: string;
    username: string;
    email: string;
    employee_id: string;
    phone: string;
    tel_ext: string;
    name: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    archived_at: string | null;
    is_validated: boolean;
    reset_password_code: string | null;
    reset_code_upto: string | null;
    login_token: string | null;
  } | null;
  issued_at: string;
  due_date: string;
  re_due_date: string | null;
}
export interface Borrower {
  id: string;
  username: string;
  email: string;
  employee_id: string;
  phone: string;
  tel_ext: string;
  name: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  archived_at: string | null;
  is_validated: boolean;
  reset_password_code: string | null;
  reset_code_upto: string | null;
  login_token: string;
  department?: Department;
}
export interface IssuedAsset {
  id: string;
  due_date: string;
  re_due_date: string | null;
  return_date: string | null;
  remarks_on_return_condition: string | null;
  fine_amount: number | null;
  create_at: string;
  updated_at: string;
  archived_at: string | null;
  re_issued: boolean;
  issued_asset: Asset;
  borrower: Borrower;
}
export interface DataCounts {
  issuedAssetsCount: number;
  overdueAssetsCount: number;
}
export interface IssuedRecord {
  id: string;
  due_date: string;
  re_due_date: string;
  return_date: string | null;
  remarks_on_return_condition: string | null;
  fine_amount: number | null;
  create_at: string;
  updated_at: string;
  archived_at: string | null;
  re_issued: boolean;
  borrower: Borrower;
  issued_asset: Asset;
  issued_by: {
    id: string;
    username: string;
    email: string;
    employee_id: string;
    phone: string;
    tel_ext: string;
    name: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    archived_at: string | null;
    is_validated: boolean;
    reset_password_code: string;
    reset_code_upto: string | null;
    login_token: string | null;
  };
}

export const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
