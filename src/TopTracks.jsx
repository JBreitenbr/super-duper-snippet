import {useState,useEffect} from "react";
const TopTracks = () => {
  const [tracks, setTracks] = useState([]);
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
  useEffect(() =>{
  fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=10`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method:"GET",
      /*body:JSON.stringify(body)*/
    }).then(response => response.json()).then((data)=>setTracks(data.items))}, [])
  return (<ol>{tracks.map((track)=><li>{track.name}</li>)}</ol>)
}
export default TopTracks;