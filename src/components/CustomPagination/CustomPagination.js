import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { UseParamsHandler } from "../../CustomHook/UseParamsHandler";
import { GET_PRODUCTS_ASYNC } from "../../Redux/productSlicer";
const CustomPagination = ({ pages }) => {
  // const {curruntPage , setPage} = UseParamsHandler()
  const dispatch = useDispatch();
  const { page} = useSelector((state) => state.products);
  const handlePaginationChange = (page) => {
    console.log(page, "curruntPage");
    dispatch(GET_PRODUCTS_ASYNC(page));
    // setPage({ page});
  };
  return (
    <>
      <Pagination
        page={page}
        count={pages}
        size="large"
        onChange={(e, num) => handlePaginationChange(num)}
        renderItem={(item) => (
          <PaginationItem
            slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
          />
        )}
      />
    </>
  );
};

export default CustomPagination;
