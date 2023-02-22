import { Cart } from '../models';

export const totalCart = (cart: Cart[]): number => {
  if (cart.length === 0) {
    return 0;
  }
  const sumWithInitial = cart.reduce(
    (accumulator, currentValue) => {
      const { quantity, price } = currentValue;
      const itemTotal = quantity * price;

      accumulator.total += itemTotal;
      return accumulator;
    },
    { total: 0 }
  );
  return sumWithInitial.total;
};
