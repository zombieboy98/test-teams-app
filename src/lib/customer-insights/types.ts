export type ApiResponseMeta = {
  count: number;
  model: string;
  next: string;
  page: number;
  previous: string;
};

export type ApiResponseCollection<T> = {
  meta: ApiResponseMeta;
  objects: T[];
};

export type CrispAccount = {
  account_id: number;
  ext: number;
  home_page: string;
  industry: string;
  name: string;
  notes: string;
  num_of_employees: number;
  parent_id: number;
  phone: string;
};
