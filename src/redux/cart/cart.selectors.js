import { createSelector } from "reselect";

const selectCart = (state) => state.cart;

export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

export const selectCartHidden = createSelector(
  [selectCart],
  (cart) => cart.hidden
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItmes) =>
    cartItmes.reduce(
      (accumilateVal, currentCartItem) =>
        accumilateVal + currentCartItem.quantity,
      0
    )
);

export const selectCartTotal = createSelector([selectCartItems], (cartItmes) =>
  cartItmes.reduce(
    (accumilateVal, currentCartItem) =>
      accumilateVal + currentCartItem.quantity * currentCartItem.price,
    0
  )
);
