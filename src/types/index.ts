export interface ConsumerBrand {
  id?: string;
  name: string;
  industry?: string;
  retailer?: string;
  deductions?: number;
  last_reviewed?: string; // ISO date string
}

export type sortOptions = {
  columnName: string;
  direction: "asc" | "desc";
};

export type GetLeadsParams = {
  pagination: {
    page: number;
    size: number;
  };
  sortOptions: sortOptions;
  filterOptions: {
    columnName: string;
    value: string;
  };
};
