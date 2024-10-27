"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useUser } from "@/context/UserContext";

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const CheckoutPage = () => {
  const { state: cartState } = useCart();
  const { state: userState } = useUser();

  useEffect(() => {
    // Load the Razorpay script as soon as the component mounts
    loadRazorpayScript();
  }, []); // Empty dependency array ensures this runs only once on mount

  const handlePayment = async () => {
    if (!userState.user) {
      alert("Please log in to proceed with payment.");
      return;
    }

    const res = await loadRazorpayScript();

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // Fetch the order details from the backend
    const orderData = await fetch("/api/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: cartState.total }),
    }).then((res) => res.json());

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!, // Your Razorpay Key ID
      amount: orderData.amount,
      currency: orderData.currency,
      name: "Develop with Shiven",
      description: "Payment for order",
      order_id: orderData.id,
      handler: async (response: any) => {
        const verifyRes = await fetch("/api/verify-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            order_id: orderData.id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            courseId: cartState.items[0].id,
            userId: userState.user?.id,
          }),
        }).then((res) => res.json());

        if (verifyRes.success) {
          alert("Payment successful! You are now enrolled.");
        } else {
          alert("Payment verification failed");
        }
      },
      prefill: {
        name: userState.user?.name ?? "Guest",
        email: userState.user?.email ?? "guest@example.com",
      },
      theme: {
        color: "#141414",
      },
    };

    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-darkKnight-primary">
      {/* Checkout Form */}
      <div className="w-full max-w-4xl bg-darkKnight-secondary rounded-md shadow-lg p-8 my-8">
        <h1 className="text-2xl text-darkKnight-text font-bold mb-6">
          Checkout
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Billing Address */}
          <div className="space-y-4">
            <label className="block">
              <span className="text-darkKnight-text">Country</span>
              <select className="bg-gray-300 form-select mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm">
                <option>India</option>
                {/* Add more options as needed */}
              </select>
            </label>
            <label className="block">
              <span className="text-darkKnight-text">
                State / Union Territory
              </span>
              <select className="bg-gray-300 form-select mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm">
                <option>Madhya Pradesh</option>
                {/* Add more options as needed */}
              </select>
            </label>
            <p className="text-xs text-gray-400">
              Develop with Shiven is required by law to collect applicable
              transaction taxes for purchases made in certain tax jurisdictions.
            </p>
          </div>

          {/* Order Summary */}
          <div className="space-y-4">
            <div className="bg-gray-300 p-4 rounded-md border border-gray-200">
              <h2 className="text-xl font-bold">Summary</h2>
              <div className="flex justify-between mt-4">
                <p className="text-sm text-gray-500">Original Price:</p>
                <p className="text-sm text-gray-500">
                  {cartState.currencySymbol} {cartState.total.toFixed(2)}
                </p>
              </div>
              <hr className="border-gray-400 my-4" />
              <div className="flex justify-between mt-2">
                <p className="text-base font-bold">Total:</p>
                <p className="text-base font-bold">
                  {cartState.currencySymbol}{" "}
                  {cartState.total ? cartState.total.toFixed(2) : "0.00"}
                </p>
              </div>
            </div>
            <button
              onClick={handlePayment}
              className="w-full bg-darkKnight-accent text-gray-700 py-3 rounded-md text-lg font-bold hover:bg-teal-500 hover:text-darkKnight-text"
            >
              Pay Now
            </button>
            <p className="text-xs text-gray-400 text-center mt-4">
              By completing your purchase you agree to these{" "}
              <Link href="#" className="text-darkKnight-accent underline">
                Terms of Service
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
