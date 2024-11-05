import { parseAsString, useQueryState } from "nuqs";

export const useSort = () => {
  const [sort, setSort] = useQueryState("sort", parseAsString);

  const bestMatch = () => setSort(null);
  const editedAsc = () => setSort("EDITED_ASC");
  const editedDesc = () => setSort("EDITED_DESC");
  const createdAsc = () => setSort("CREATED_ASC");
  const createdDesc = () => setSort("CREATED_DESC");

  return {
    sort,
    bestMatch,
    editedAsc,
    editedDesc,
    createdAsc,
    createdDesc
  }
}