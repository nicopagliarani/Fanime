import { useState } from "react";

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
      />
      <input
        type="password"
        name="password"
        autoComplete={passwordAutoComplete}
        value={formState.password}
        onChange={handleFormState}
      />
      <button type="submit">{btnText}</button>
    </form>
  );
}
