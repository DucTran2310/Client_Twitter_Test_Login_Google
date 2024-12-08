import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Base styles for media player and provider (~400B).
import "@vidstack/react/player/styles/base.css";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import "@vidstack/react/player/styles/base.css";
import "@vidstack/react/player/styles/plyr/theme.css";
import { defaultLayoutIcons } from "@vidstack/react/player/layouts/default";
import { DefaultVideoLayout } from "@vidstack/react/player/layouts/default";

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
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const hasToken = localStorage.getItem("access_token");
    setIsLogin(!!hasToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    setIsLogin(false);
  };

  return (
    <>
      <h1>Google OAuth2</h1>
      <div className="card">
        {isLogin ? (
          <>
            <div>
              <span>hello friend, you are logged in</span>
              <button onClick={() => handleLogout()}>Logout</button>
            </div>
            <p>Video Stream</p>
            <video
              src="http://localhost:8080/static/video-stream/94cf22e26805a98cfb123ad00.mp4"
              controls
              width={500}
            />

            <h2>HLS Streaming</h2>
            <MediaPlayer
              title="Sprite Fight"
              src="http://localhost:8080/static/video-hls/MGUKeBL1Q1SI0cIcEzeKh/master.m3u8"
              aspectRatio={16 / 9}
              crossorigin=""
            >
              <MediaProvider />
              <DefaultVideoLayout icons={defaultLayoutIcons} />
            </MediaPlayer>
          </>
        ) : (
          <Link to={googleOAuthURL}>Login with Google</Link>
        )}
      </div>
    </>
  );
};

export default Home;
