import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StorContext";
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Sign Up");
  const [data, setData] = useState({ name: "", email: "", password: "" });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }
    try {
      const response = await axios.post(newUrl, data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert("An error occurred while submitting the form. Please try again.");
      console.error("Form submission error:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center animate-fade-in">
      <form
        onSubmit={onLogin}
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl flex flex-col gap-6 px-8 py-10 relative animate-fade-in"
      >
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold text-primary">{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="Close"
            className="w-6 h-6 cursor-pointer hover:scale-110 transition"
          />
        </div>
        <div className="flex flex-col gap-4">
          {currState !== "Login" && (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your name"
              required
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-primary text-base"
            />
          )}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your email"
            required
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-primary text-base"
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Password"
            required
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-primary text-base"
          />
        </div>
        <button
          type="submit"
          className="bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-lg shadow transition text-lg"
        >
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>
        <div className="flex items-start gap-2 text-sm mt-[-10px]">
          <input type="checkbox" required className="mt-1" />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currState === "Login" ? (
          <p className="text-sm text-gray-600">
            Create a new account?{" "}
            <span
              onClick={() => setCurrState("Sign Up")}
              className="text-primary font-semibold cursor-pointer hover:underline"
            >
              Click here
            </span>
          </p>
        ) : (
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <span
              onClick={() => setCurrState("Login")}
              className="text-primary font-semibold cursor-pointer hover:underline"
            >
              Login here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
