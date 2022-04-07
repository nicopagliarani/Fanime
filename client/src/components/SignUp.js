import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../consts";
import { UserNameAndPasswordForm } from "./UserNameAndPasswordForm";

export function SignUp() {
  const [errorState, SetErrorState] = useState();
  const SignUp = async (formState) => {
    try {
      console.log("formState", formState);
      const response = await axios.post(API_BASE_URL + "api/signup", formState);
      console.log(response.data);
    } catch (err) {
      console.log(err.response);
      SetErrorState({ message: err.response.data.errorMessage });
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
