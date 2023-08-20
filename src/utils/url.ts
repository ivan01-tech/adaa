export type SearchParams = {
  search: string;
  limit: number;
};

const URLS = {
  PRODUCTS: {
    DETAILS: (numberOfItem: number, page: number) =>
      `/products?limit=${numberOfItem}&skip=${5 * page}`,
    SEARCH: (b: SearchParams) =>
      `/products/search?limit=${b.limit}&q=${b.search}`,
  },
};
export default URLS;
