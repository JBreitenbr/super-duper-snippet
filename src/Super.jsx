import {useState} from "react"
import Test from "./Test";
const Super = () => {
  const [taekscht,setTaekscht] = useState("Last four weeks");
  const [zahl,setZahl]= useState(1);
  return (
    <div style={{display:"flex",flexDirection:"row"}}>{/*<button onClick={()=>setZahl(1)}>last four weeks</button>
<button onClick={()=>setZahl(2)}>last six months</button>
  <button onClick={()=>setZahl(3)}>last year</button>*/}
      <Test taekscht={taekscht} num={zahl}/>
    </div>
  );
}
export default Super;