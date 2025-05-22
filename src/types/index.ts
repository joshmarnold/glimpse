export type sortOptions = {
  columnName: string;
  direction: "asc" | "desc";
};

export type filterOptions = {
  columnName: string;
  value: string;
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

export type Lead = {
  id?: string;
  lead_id: string;
  lead_name: string;
  source: string;
  interest_level: string;
  status: string;
  assigned_salesperson: string;
  contact_information: string;
};
