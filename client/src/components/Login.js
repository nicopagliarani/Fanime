import { useContext, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../consts";
import { UserNameAndPasswordForm } from "./UserNameAndPasswordForm";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProviderWrapper";

export function Login() {
  const [errorState, SetErrorState] = useState();
  const navigate = useNavigate();
  const { addUserToContext } = useContext(AuthContext);
  const login = async (formState) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/login`, formState);
      addUserToContext(response.data.user);
      navigate("/home");
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
