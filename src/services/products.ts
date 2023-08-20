import URLS, { SearchParams } from "../utils/url";
import makeRequest from "../utils/makeRequest";

/**
 * a function to get  products
 * @param page
 * @param numberOfItem
 * @returns
 */
export async function getProducts(page: number, numberOfItem: number) {
  return makeRequest(URLS.PRODUCTS.DETAILS(numberOfItem, page), {
    method: "GET",
  })
    .then((res: CoustomAxiosResponse) => {
      if (typeof res == "string") return Promise.reject(res);

      return res;
    })
    .catch((err: Error) => err.message);
}
/**
 * a function which helps to search  products
 * @param search
 * @returns
 */
export async function searchProducts(b: SearchParams) {
  console.log("params : ",b)
  return makeRequest(URLS.PRODUCTS.SEARCH(b), { method: "GET" })
    .then((res: CoustomAxiosResponse) => {
      if (typeof res == "string") return Promise.reject(res);

      return res;
    })
    .catch((err: Error) => err.message);
}
