import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../consts";
import { UserNameAndPasswordForm } from "./UserNameAndPasswordForm";
import { useNavigate } from "react-router-dom";

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
    <div>
      <h1>Sign Up</h1>
      <UserNameAndPasswordForm
        btnText={"Sign Up"}
        submitFormAction={SignUp}
        passwordAutoComplete={"new-password"}
        error={errorState}
      />
    </div>
  );
}
