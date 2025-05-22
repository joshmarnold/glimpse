import type { GetLeadsParams, Lead } from "@/types";
import supabase from "@lib/createClient.ts";

export async function getLeads({
  pagination,
  sortOptions,
  filterOptions,
}: GetLeadsParams): Promise<{
  data: Lead[];
  count: number | null;
  error: object | null;
}> {
  const { page, size } = pagination;
  const { columnName: sortCol, direction } = sortOptions;
  const { columnName: filterCol, value: filterVal } = filterOptions;

  let query = supabase
    .from("leads")
    .select("*", { count: "exact" })
    .range(page * size, (page + 1) * size - 1);

  if (sortCol) {
    query = query.order(sortCol, { ascending: direction === "asc" });
  }

  if (filterCol && filterVal) {
    query = query.ilike(filterCol, `%${filterVal}%`);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error("Supabase error:", error.message);
    return { data: [], count: 0, error };
  }

  return { data, count, error: null };
}
