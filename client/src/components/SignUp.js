import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../consts";
import { UserNameAndPasswordForm } from "./UserNameAndPasswordForm";
import { Link, useNavigate } from "react-router-dom";
import "../Css/Signup.css";

export function SignUp() {
  const navigate = useNavigate();
  const [errorState, SetErrorState] = useState();
  const SignUp = async (formState) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/signup`,
        formState
      );
      navigate("/login");
    } catch (err) {
      SetErrorState({ message: "Error sigup" });
    }
  };
  return (
    <div className="Container">
      <h1>Sign Up</h1>
      <UserNameAndPasswordForm
        btnText={"Sign Up"}
        submitFormAction={SignUp}
        passwordAutoComplete={"new-password"}
        error={errorState}
      />
      <Link to={"/login"} style={{ textDecoration: "none", color: "white" }}>
        <p>Already have an account ? Go to login !</p>
      </Link>
    </div>
  );
}
