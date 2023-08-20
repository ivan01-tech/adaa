import api from "../api/axios";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

/**
 *	a function to make any kind og resquest with the  axios instance
 * @param {string} url
 * @param {import("axios").AxiosRequestConfig} options
 * @returns
 */

async function makeRequest(
  url: string,
  options: AxiosRequestConfig<ResponseTypeProducts>
) {
  return api(url, options)
    .then((res: AxiosResponse<ResponseTypeProducts>) => {
      const d = res.data;
      // TODO delete it
      console.log("d : ", d, url);
      return d;
    })
    .catch((err:AxiosError) => {

      console.log("eror : ", err);
      return err.message;
    });
}

export default makeRequest;
