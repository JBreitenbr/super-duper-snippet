//import React from "react";
import {useState,useEffect,useNavigate } from "react";
//import SpotifyFunctions from "./spotiFunctions.js";
import './App.css';
const Alternative = () => {const { VITE_CLIENT_ID } = import.meta.env;
const { VITE_REDIRECT_URI } = import.meta.env;
const scopes = [
  "user-top-read",
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-private",
];
  const [accessToken, setAccessToken] = useState(null);  const [tracks, setTracks] = useState([]);
  const handleLogin = () => {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${VITE_CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(
      VITE_REDIRECT_URI
    )}&scope=${encodeURIComponent(scopes.join(" "))}`;

    const width = 500;
    const height = 600;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    
    const popup = window.open(
      authUrl,
      "Spotify Authorization",
      `width=${width},height=${height},top=${top},left=${left}`
    );

    const timer = setInterval(() => {
      try {
        if (popup.closed) {
          clearInterval(timer);
          console.log("Popup closed before authorization.");
        }

        const hash = popup.location.hash;
        if (hash) {
          const params = new URLSearchParams(hash.substring(1));
          const accessToken = params.get("access_token");
          if (accessToken) {
            setAccessToken(accessToken);
localStorage.setItem("accessToken",accessToken);
//SpotifyFunctions.setAccessToken(accessToken);  
           //onAccessTokenReceived(accessToken); // Pass the token to the parent component
            popup.close();
            clearInterval(timer);
          }
        }
      } catch (err) {
        // Ignore cross-origin errors until redirect_uri matches
      }
    }, 500);
    useNavigate("/super-duper-snippet/top-tracks");
  };

  return (<div style={{backgroundColor:"lightblue"}}><button onClick={handleLogin} >Login with Spotify</button>
    <p>{accessToken}</p></div>)
};

export default Alternative;