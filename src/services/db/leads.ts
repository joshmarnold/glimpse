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

export async function uploadLeadsCSV(file: File): Promise<{
  success: boolean;
  error?: string;
  data?: Lead[];
}> {
  try {
    const text = await file.text();
    const rows = parseCSV(text) as Lead[];

    const { error } = await supabase.from("leads").insert(rows);

    if (error) {
      console.error("Insert error:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data: rows };
  } catch (err) {
    console.error("Upload failed:", err);
    return { success: false, error: String(err) };
  }
}

function parseCSV(csvText: string): Record<string, string>[] {
  const [headerLine, ...lines] = csvText.trim().split("\n");
  const headers = headerLine.split(",").map((h) => h.trim());

  return lines.map((line) => {
    const values = line.split(",").map((v) => v.trim());
    return Object.fromEntries(headers.map((h, i) => [h, values[i]]));
  });
}

export async function deleteAllLeads(): Promise<{
  success: boolean;
  error?: string;
}> {
  const { error } = await supabase.from("leads").delete().neq("id", 2000); // deletes all rows

  if (error) {
    console.error("Delete error:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true };
}
