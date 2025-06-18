import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StorContext";
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);

  const [currState, setCurrState] = useState("Sign Up");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const onLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

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
        setError(response.data.message || "An error occurred");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while submitting the form. Please try again.";
      setError(errorMessage);
      console.error("Form submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShowLogin(false);
    setError("");
    setData({ name: "", email: "", password: "" });
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={handleClose} src={assets.cross_icon} alt="Close" />
        </div>

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        <div className="login-popup-inputs">
          {currState !== "Login" && (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your name"
              required
              disabled={loading}
            />
          )}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your email"
            required
            disabled={loading}
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Password"
            required
            disabled={loading}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading
            ? "Processing..."
            : currState === "Sign Up"
              ? "Create account"
              : "Login"}
        </button>

        <div className="login-popup-condition">
          <input type="checkbox" required disabled={loading} />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>

        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
