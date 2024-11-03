import { Category } from "@/types";

export type SearchType = {
  type: Category;
  id: string;
  name: string;
  icon: string | null;
  description: string;
  createdBy: string;
  createdAt: string;
}