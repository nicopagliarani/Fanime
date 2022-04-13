import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../consts";
import { AuthContext } from "../context/AuthProviderWrapper";

export function Profile() {
  const navigate = useNavigate();
  const { user,  addUserToContext, removeUserFromContext } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      
      const stayLogin = async()=>{ 
        const userFromSession = await axios.get(`${API_BASE_URL}/api/verify`); 
      if(!userFromSession.data) {
        navigate("/login");
      }else{
        addUserToContext(userFromSession.data.user)
      }
      }
      stayLogin();
    }
  }, []);

  const logout = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/logout`);
      console.log(response.data);
      removeUserFromContext();
      navigate("/login");
    } catch (err) {
      console.log(err);
      alert("there was an error logging out");
    }
  };
  return ( user ? (
    <div>
      <h1>Profile Page</h1>
      {user && <h2>Welcome, {user.username}</h2>}
      <button onClick={logout}>Logout</button>
    </div>): <p>Loading</p>
  );
}
