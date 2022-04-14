import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../consts";
import { AuthContext } from "../context/AuthProviderWrapper";

export function Profile() {
  const navigate = useNavigate();
  const { user, addUserToContext, removeUserFromContext } =
    useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      const stayLogin = async () => {
        const userFromSession = await axios.get(`${API_BASE_URL}/api/verify`);
        if (!userFromSession.data) {
          navigate("/login");
        } else {
          addUserToContext(userFromSession.data.user);
        }
      };
      stayLogin();
    }
  }, []);

  function handleUserImage(event) {
    event.preventDefault();
    let image = event.target.imageUrl.files[0];
    let imageFormData = new FormData();
    imageFormData.append("imageUrl", image);

    async function sendImage() {
      let updatedUser = await axios.post(
        `${API_BASE_URL}/api/upload`,
        imageFormData,
        {
          withCredentials: true,
        }
      );
      console.log("saved", updatedUser.data);
      addUserToContext(updatedUser.data);
    }
    sendImage();
  }

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

  return user ? (
    <div>
      {console.log(user)}
      <h1>Profile Page</h1>
      {user.imageUrl && (
        <img
          src={user.imageUrl}
          alt="profile"
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "100px",
            background: "white",
          }}
        />
      )}
      {user && <h2>Welcome, {user.username}</h2>}
      <div>
        <h3>Update your User Image:</h3>
        <form
          onSubmit={handleUserImage}
          method="post"
          encType="multipart/form-data"
        >
          <input type="file" accept="image/png, image/jpg" name="imageUrl" />
          <button type="submit">Update</button>
        </form>
      </div>

      <button onClick={logout}>Logout</button>
    </div>
  ) : (
    <p>Loading</p>
  );
}
