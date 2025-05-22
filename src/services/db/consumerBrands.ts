import supabase from "@lib/createClient.ts";
import type { ConsumerBrand } from "@/types";

export async function getAllConsumerBrands() {
  const { data, error } = await supabase.from("consumer_brands").select("*");

  if (error) throw error;
  return data as ConsumerBrand[];
}
