"use client";

import React, {
  createContext,
  useReducer,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import getUserCurrency from "@/services/currrencyService";
import { currencyData } from "@/data/currencyData";
import { useAuth } from "./AuthContext";

type CartItem = {
  id: string;
  title: string;
  originalPrice: number;
  price: number;
  imageUrl: string;
  instructor: string;
  rating: number;
  reviews: number;
  duration: string;
  lectures: number;
  level: string;
  currencySymbol: string;
};

interface CartState {
  items: CartItem[];
  total: number;
  currencySymbol: string;
}

interface CartAction {
  type: string;
  id?: string;
  item?: CartItem;
  currencySymbol?: string;
}

const initialState: CartState = {
  items: [],
  total: 0,
  currencySymbol: "US",
};

const calculateTotal = (items: CartItem[]) =>
  items.reduce((sum, item) => sum + item.price, 0);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_TO_CART":
      if (action.item) {
        const updatedItems = [...state.items, action.item];
        const updatedTotal = calculateTotal(updatedItems);
        return { ...state, items: updatedItems, total: updatedTotal };
      }
      return state;

    case "REMOVE_FROM_CART":
      const filteredItems = state.items.filter((item) => item.id !== action.id);
      const updatedTotal = calculateTotal(filteredItems);
      return { ...state, items: filteredItems, total: updatedTotal };

    case "SET_CURRENCY":
      const currencyInfo = currencyData[action.currencySymbol || "US"];
      if (!currencyInfo) {
        console.error(
          `Currency symbol "${action.currencySymbol}" not found. Defaulting to USD.`
        );
        return state; // Keep the current state unchanged
      }

      const { symbol, converter } = currencyInfo;
      const convertedItems = state.items.map((item) => ({
        ...item,
        price: item.originalPrice * converter,
        currencySymbol: symbol,
      }));
      const convertedTotal = calculateTotal(convertedItems);

      return {
        ...state,
        currencySymbol: action.currencySymbol || "US",
        items: convertedItems,
        total: convertedTotal,
      };

    default:
      return state;
  }
};

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  handleAddToCart: (item: CartItem) => void;
  handleBuyNow: (item: CartItem) => void;
}>({
  state: initialState,
  dispatch: () => undefined,
  handleAddToCart: () => {},
  handleBuyNow: () => {},
});

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const { state: authState, redirectToLogin } = useAuth();

  const [state, dispatch] = useReducer(cartReducer, initialState, () => {
    if (typeof window !== "undefined") {
      const storedState = localStorage.getItem("cartState");
      return storedState ? JSON.parse(storedState) : initialState;
    }
    return initialState;
  });

  const router = useRouter();

  useEffect(() => {
    const fetchCurrency = async () => {
      const country = await getUserCurrency();

      dispatch({
        type: "SET_CURRENCY",
        currencySymbol: country,
      });
    };

    fetchCurrency();
  }, []);

  useEffect(() => {
    localStorage.setItem("cartState", JSON.stringify(state));
  }, [state]);

  const handleAddToCart = (item: CartItem) => {
    const countryCode = state.currencySymbol || "US";
    const { converter } = currencyData[countryCode];
    const convertedPrice = item.originalPrice * converter;

    dispatch({
      type: "ADD_TO_CART",
      item: {
        ...item,
        price: convertedPrice,
        currencySymbol: currencyData[countryCode].symbol,
      },
    });
  };

  const handleBuyNow = (item: CartItem) => {
    handleAddToCart(item);
    if (authState.isAuthenticated) {
      router.push("/checkout");
    } else {
      // Redirect to login if not authenticated
      redirectToLogin("/checkout");
    }
  };

  return (
    <CartContext.Provider
      value={{ state, dispatch, handleAddToCart, handleBuyNow }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
