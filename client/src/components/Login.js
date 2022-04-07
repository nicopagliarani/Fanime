import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../consts";
import { UserNameAndPasswordForm } from "./UserNameAndPasswordForm";

export function Login() {
  const [errorState, SetErrorState] = useState();
  const login = async (formState) => {
    try {
      console.log("formState", formState);
      const response = await axios.post(API_BASE_URL + "api/login", formState);
      console.log(response.data);
    } catch (err) {
      console.log(err.response);
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
