import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

export const useSellerSignup = () => {
  const [sellerError, setSellerError] = useState(null);
  const [isSellerLoading, setIsSellerLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const sellerSignup = async (
    email,
    password,
    retypePassword,
    organization,
    marketID
  ) => {
    setIsSellerLoading(true);
    setSellerError(null);

    console.log([email, password, retypePassword, organization, marketID]);

    const response = await fetch("http://localhost:4141/seller/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        organization,
        password,
        retypePassword,
        marketID,
      }),
    });
    const json = await response.json();
    if (!response.ok) {
      setIsSellerLoading(false);
      setSellerError(json.error);
    }
    if (response.ok) {
      // save user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // update auth context
      dispatch({ type: "LOGIN", payload: json });
    }
  };

  return { sellerSignup, isSellerLoading, sellerError };
};
