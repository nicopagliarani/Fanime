import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../consts";
import { UserNameAndPasswordForm } from "./UserNameAndPasswordForm";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [errorState, SetErrorState] = useState();
  const navigate = useNavigate();
  const login = async (formState) => {
    try {
      console.log("formState", formState);
      console.log(API_BASE_URL);
      const response = await axios.post(`${API_BASE_URL}/api/login`, formState);
      console.log(response.data);
      navigate("/profile");
    } catch (err) {
      console.log(err.response, "error");
      SetErrorState({ message: err.response.data.errorMessage });
    }
  };
  return (
    <div>
      <h1>Login Page</h1>
      <UserNameAndPasswordForm
        btnText={"Login"}
        submitFormAction={login}
        passwordAutoComplete={"current-password"}
        error={errorState}
      />
    </div>
  );
}
