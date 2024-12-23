import SpotifyAuthButton from "./SpotifyAuthButton";import * as SpotifyFunctions from './spotiFunctions.js'
import {useState,useEffect} from "react";
const Test = ({taekscht,num}) => {
  const { VITE_CLIENT_ID } = import.meta.env;
const { VITE_REDIRECT_URI } = import.meta.env;
const scopes = [
  "user-top-read",
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-private",
];
  //const [cl,setCl]=useState("buttonA");
  const [accessToken, setAccessToken] = useState(null);                  const handleAccessToken = (token) => {
      setAccessToken(token);
      console.log("Received Access Token:", token);
    };
  const [favArtists, setFavArtists] = useState([]);

useEffect(() => {
    (async function() {
        await SpotifyFunctions.setAccessToken(accessToken);
  let artists;
  if(num==1){artists = await SpotifyFunctions.getFavArtists1();}
  if(num==2){artists = await SpotifyFunctions.getFavArtists2();}
  if(num==3){artists = await SpotifyFunctions.getFavArtists3();}
let length=artists.items.length;
let artArr=[];
for(let i=0;i<length;i++){
  artArr.push({});
  artArr[i]["name"]=artists.items[i].name;
  artArr[i]["id"]=artists.items[i].id;
  artArr[i]["image"]=artists.items[i].images[2].url;
}
      setFavArtists(artArr);

    })();
  }, [accessToken])

return (
      <div><SpotifyAuthButton
            clientId= {VITE_CLIENT_ID}
            redirectUri={VITE_REDIRECT_URI}
            scopes={scopes}
            onAccessTokenReceived={handleAccessToken}
            taekscht={taekscht}
          />
 {accessToken?(<div style={{backgroundColor:"purple"}}><ol style={{width:"100vw"}}>{favArtists.map((item)=><li key={item.id}><h2>{item.name}</h2><img style={{width:"100px",height:"100px"}} src={item.image}/></li>)}</ol></div>):<div></div>}
      </div>)
}
export default Test;