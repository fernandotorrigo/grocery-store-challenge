export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

export interface Cart extends Product {
  quantity: number;
}

export interface Quotes {
  [key: string]: number;
}

export interface Rates {
  success: boolean;
  timestamp: number;
  source: string;
  quotes: Quotes;
}

export interface State {
  groceryRootStore: {
    products: Product[];
    cart: Cart[];
    currencyData: Quotes;
  };
}
export interface OptionsCurrency {
  name: string;
  value: number;
}
