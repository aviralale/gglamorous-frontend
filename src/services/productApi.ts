import { axiosInstance } from "@/auth/auth";
import { SearchParams, SearchResponse } from "@/types/types";
export const productApi = {
  search: async (params: SearchParams) => {
    try {
      const response = await axiosInstance.get<SearchResponse>(
        "products/search/",
        {
          params,
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
