import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const getGoogleAuthURL = () => {
  const url = `https://accounts.google.com/o/oauth2/v2/auth`;
  const query = {
    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    redirect_uri: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
    response_type: "code",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
    prompt: "consent",
  };

  const querystring = new URLSearchParams(query).toString();
  return `${url}?${querystring}`;
};

const googleOAuthURL = getGoogleAuthURL();

const Home = () => {
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    if (Boolean(localStorage.getItem("access_token"))) {
      setIsLogin(true)
    } else setIsLogin(false)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')

    setIsLogin(false)
  }

  return (
    <>
      <h1>Google OAuth2</h1>
      <div className="card">
        {isLogin ? (
          <div>
            <span>hello friend, you are logged in</span>
            <button onClick={() => handleLogout()}>Logout</button>
          </div>
        ) : (
          <Link to={googleOAuthURL}>Login with Google</Link>
        )}
      </div>
    </>
  );
};

export default Home;
