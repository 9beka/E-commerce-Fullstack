import React  from "react";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { useSelector } from "react-redux";

import Cart from "../Cart/Cart"
import "./BadgeCart.scss"
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const BadgeCart = ({ handleToggle }) => {
  const { cartData } = useSelector((state) => state.cart);
  return (
    <>
      <IconButton onClick={handleToggle}  aria-label="cart">
      <StyledBadge  badgeContent={cartData?.items?.length} color="secondary">
      <Cart/>
      </StyledBadge>
    </IconButton>
      
  </>
  );
};
export default BadgeCart;
