/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { api } from "../api";
import axios from "axios";

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [paymentOptions, setPaymentOptions] = useState([]);
  const [activeVouchers, setActiveVouchers] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [selectedVoucher, setSelectedVoucher] = useState("");
  console.log(cartItems, "product");
  console.log(paymentOptions, "paymentOptions");

  console.log(activeVouchers, "activeVouchers");

  useEffect(() => {
    const productList = async () => {
      try {
        const response = await api.get("/product");
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        setCartItems(response.data);
      } catch (error) {
        console.error("Error fetching ", error.message);
      }
    };

    const paymentTypeOptions = async () => {
      try {
        const response = await api.get("/payment");
        if (!response.ok) {
          throw new Error("Failed to fetch payment options");
        }
        setPaymentOptions(response.data);
      } catch (error) {
        console.error("Error fetching payment options:", error);
      }
    };

    const getVouchers = async () => {
      try {
        const response = await api.get("/vouchers");
        if (!response.ok) {
          throw new Error("Failed to fetch active vouchers");
        }
        setActiveVouchers(response.data);
      } catch (error) {
        console.error("Error fetching active vouchers:", error);
      }
    };

    productList();
    paymentTypeOptions();
    getVouchers();
  }, []);

  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };

  const handleVoucherChange = (event) => {
    setSelectedVoucher(event.target.value);
  };

  const handleCheckout = () => {
    console.log("Checkout initiated");
  };

  return (
    <div>
      <h2>Checkout</h2>
      <div>
        <h3>productList</h3>
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Payment Method</h3>
        <select onChange={handlePaymentMethodChange}>
          <option value="">Select Payment Method</option>
          {paymentOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <h3>Active Vouchers</h3>
        <select onChange={handleVoucherChange}>
          <option value="">Select Voucher</option>
          {activeVouchers.map((voucher) => (
            <option key={voucher.id} value={voucher.id}>
              {voucher.code}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
};

export default CheckoutPage;
