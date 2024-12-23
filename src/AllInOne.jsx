import {useState,useEffect} from "react";
const AllInOne = () => {
const [accessToken, setAccessToken] = useState(null);

const { VITE_CLIENT_ID } = import.meta.env;
const { VITE_REDIRECT_URI } = import.meta.env;
const scopes = [
  "user-top-read",
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-private",
];
    useEffect(() => {
    const initiateAuth = () => {
      const authUrl = `https://accounts.spotify.com/authorize?client_id=${VITE_CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(
        VITE_REDIRECT_URI
      )}&scope=${encodeURIComponent(scopes.join(" "))}`;

      const width = 500;
      const height = 600;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;

      const popup = window.open(
        authUrl,
        "Spotify Authorization",
        `width=${width},height=${height},top=${top},left=${left}`
      );
const handleMessage = (event) => {
        if (event.origin === window.location.origin && event.data.accessToken) {
          setAccessToken(event.data.accessToken);
          popup.close();
        }
      };

      window.addEventListener("message", handleMessage);

      // Cleanup event listener
      return () => window.removeEventListener("message", handleMessage);
    };

    // Automatically initiate the authentication process on component load
    initiateAuth();
  }, []);

  return (
    <div>
      <h1>Spotify Authentication</h1>
      {accessToken ? (
        <p>Access Token: {accessToken}</p>
      ) : (
        <p>Authenticating with Spotify...</p>
      )}
    </div>
  );
};

export default AllInOne;









