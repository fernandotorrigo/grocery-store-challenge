import { RootState } from '../models';

export const initialStateMock: RootState = {
  groceryRootStore: {
    products: [],
    currencyData: {
      BRL: 123,
    },
    cart: [],
  },
};

export const stateDefaultMock: RootState = {
  groceryRootStore: {
    products: [
      {
        id: 1,
        name: 'Peas',
        price: 0.95,
        image: '/assets/images/peas.png',
        description: 'Peas per bag',
      },
      {
        id: 2,
        name: 'Eggs',
        price: 2.1,
        image: '/assets/images/eggs.png',
        description: 'Eggs per dozen',
      },
      {
        id: 3,
        name: 'Milk',
        price: 1.3,
        image: '/assets/images/milk.png',
        description: 'Milk per bottle',
      },
      {
        id: 4,
        name: 'Beans',
        price: 0.73,
        image: '/assets/images/beans.png',
        description: 'Baked Beans - per can',
      },
    ],
    currencyData: {
      BRL: 123,
    },
    cart: [
      {
        id: 1,
        quantity: 1,
        name: 'Peas',
        price: 0.95,
        image: '/assets/images/peas.png',
        description: 'Peas per bag',
      },
      {
        id: 2,
        quantity: 1,
        name: 'Eggs',
        price: 2.1,
        image: '/assets/images/eggs.png',
        description: 'Eggs per dozen',
      },
    ],
  },
};
