import { useSearchParams } from "react-router-dom";

export const UseParamsHandler = () => {
   const [searchParams, setSearchParams] = useSearchParams();

   const defaultParams = { search: "", pagination : "NO" };
   const currentSearch = searchParams.get("search") || defaultParams.search;
   const currentPage = Number(searchParams.get("page")) || defaultParams.page;
   const currenPagination = searchParams.get("pagination")|| defaultParams.pagination
   const currentPageSize =
   Number(searchParams.get("pageSize")) || defaultParams.pageSize;


   const setPage = (newParams) => {
      setSearchParams((prevParams) => {
        const allParams = Array.from(prevParams.entries()).reduce(
          (acc, [key, value]) => {
            return { ...acc, [key]: value };
          },
          {}
        );
        const finalParams = { ...allParams, ...newParams };
        const cleanedParams = removeDefaultParams(finalParams, defaultParams);
        return cleanedParams;
      });
    };

    const removeDefaultParams = (params, defaultParams) => {
      // { page: 1, pageSize: 10, search: "" } = params
      // [['page',1],[],[]]
      const cleanedParams = { ...params };
      for (const [key, value] of Object.entries(defaultParams)) {
        if (cleanedParams[key] === value) {
          delete cleanedParams[key];
        }
      }
      return cleanedParams;
    };
    const colection = {
      page: currentPage,
      pageSize: currentPageSize,
     
    };
    return [colection, setPage];
};

export default UseParamsHandler;