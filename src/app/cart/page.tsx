"use client";

import React, { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import getUserCurrency from "@/services/currrencyService";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const { state: cartState, dispatch } = useCart();
  const { state: authState, redirectToLogin } = useAuth();
  const [currencySymbol, setCurrencySymbol] = useState("");
  const router = useRouter();

  const handleRemoveFromCart = (id: string) => {
    dispatch({ type: "REMOVE_FROM_CART", id });
  };

  const handleCheckout = () => {
    if (authState.isAuthenticated) {
      // If authenticated, redirect to checkout
      router.push("/checkout");
    } else {
      // If not authenticated, redirect to login
      redirectToLogin("/checkout");
    }
  };

  useEffect(() => {
    const fetchCurrency = async () => {
      const currency = await getUserCurrency();
      setCurrencySymbol(currency);
    };
    fetchCurrency();
  }, []);

  return (
    <div className="bg-darkKnight-primary min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-2 py-20 lg:py-20">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-darkKnight-text">
          Shopping Cart
        </h1>
        <div className="flex flex-col lg:flex-row">
          {/* Cart Items Section */}
          <div className="flex-1 lg:mr-8">
            {cartState.items.length === 0 ? (
              <p className="text-center text-darkKnight-text">
                Your cart is empty.{" "}
                <Link href="/courses" className="text-blue-500">
                  Browse Courses
                </Link>
              </p>
            ) : (
              <>
                <div className="bg-darkKnight-secondary p-4 sm:p-6 rounded-lg shadow mb-6 lg:mb-8">
                  <h2 className="text-lg font-semibold text-darkKnight-text mb-4">
                    {cartState.items.length} Course
                    {cartState.items.length > 1 ? "s" : ""} in Cart
                  </h2>
                  <ul className="divide-y divide-darkKnight-secondary">
                    {cartState.items.map((item) => (
                      <li
                        key={item.id}
                        className="flex flex-col sm:flex-row items-start py-4"
                      >
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="h-20 w-20 sm:h-24 sm:w-24 rounded-md mb-4 sm:mb-0 sm:mr-4 object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="text-md sm:text-lg font-bold text-darkKnight-text">
                            {item.title}
                          </h3>
                          <p className="text-sm text-darkKnight-text mb-2">
                            By {item.instructor}
                          </p>
                          <p className="text-sm text-darkKnight-text mb-2">
                            Updated Recently • {item.rating} ★ ({item.reviews}{" "}
                            ratings)
                          </p>
                          <div className="text-sm text-darkKnight-text">
                            {item.duration} total hours • {item.lectures}{" "}
                            lectures • {item.level}
                          </div>
                          <div className="flex items-center mt-2">
                            <button
                              onClick={() => handleRemoveFromCart(item.id)}
                              className="text-darkKnight-accent hover:text-teal-500 mr-4"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                        <div className="text-right sm:text-left mt-4 sm:mt-0">
                          <p className="text-md sm:text-lg font-bold text-darkKnight-text">
                            {cartState.currencySymbol} {item.price.toFixed(2)}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>

          {/* Checkout Section */}
          {cartState.items.length > 0 && (
            <div className="mt-8 lg:mt-0 lg:w-81">
              <div className="bg-darkKnight-secondary p-4 sm:p-6 rounded-lg shadow">
                <div className="mb-4">
                  <h2 className="text-lg font-bold text-darkKnight-text">
                    Total:
                  </h2>
                  <p className="text-2xl font-bold text-darkKnight-text">
                    {cartState.currencySymbol}{" "}
                    {cartState.total ? cartState.total.toFixed(2) : "0.00"}
                  </p>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-darkKnight-accent font-bold text-darkKnight-secondary py-3 rounded-lg hover:bg-teal-500 hover:text-darkKnight-text mb-4"
                >
                  Checkout
                </button>

                <div className="border-t border-darkKnight-secondary pt-4">
                  <h3 className="text-sm font-bold text-darkKnight-text mb-2">
                    Promotions
                  </h3>
                  <p className="text-sm text-darkKnight-accent mb-2">
                    COUPONCODE is applied
                  </p>
                  <button className="text-xs text-darkKnight-text hover:text-darkKnight-accent mb-4">
                    Remove
                  </button>
                  <div className="flex">
                    <input
                      type="text"
                      className="flex-1 bg-darkKnight-secondary border rounded-l-lg py-2 px-3 text-sm text-darkKnight-text focus:outline-none"
                      placeholder="Enter Coupon"
                    />
                    <button className="bg-darkKnight-accent text-darkKnight-secondary font-semibold py-2 px-4 rounded-r-lg hover:bg-teal-500 hover:text-darkKnight-text">
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
