import { Database } from "@/lib/data";

export async function getStatusList() {
  return await Database.status.findMany({ orderBy: { name: "asc" } });
} 