import { Database } from "@/lib/data";

export async function getUsersList() {
  return await Database.user.findMany({ orderBy: { name: "asc" } });
}
