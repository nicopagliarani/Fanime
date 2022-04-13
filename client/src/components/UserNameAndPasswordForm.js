import { useState } from "react";
import "../Css/Signup.css";
import "../Css/Login.css";

export function UserNameAndPasswordForm({
  submitFormAction,
  btnText,
  passwordAutoComplete,
  error = null,
}) {
  const [formState, setFormState] = useState({ username: "", password: "" });
  const handleFormState = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    submitFormAction(formState);
  };
  return (
    <form onSubmit={handleSubmit}>
      {error && <h2>{error.message}</h2>}
      <input
        type="text"
        name="username"
        autoComplete="username"
        value={formState.username}
        onChange={handleFormState}
        placeholder="Enter your username"
        className="UsernameInput"
      />
      <input
        type="password"
        name="password"
        autoComplete={passwordAutoComplete}
        value={formState.password}
        onChange={handleFormState}
        placeholder="Enter your password"
        className="passwordInput"
      />
      <button type="submit" className="btnLog">
        {btnText}
      </button>
    </form>
  );
}
