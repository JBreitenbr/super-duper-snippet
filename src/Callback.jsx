import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    if (window.opener && hash) {
      const params = new URLSearchParams(hash.substring(1));
      const accessToken = params.get("access_token");

      // Send the token back to the parent window
      window.opener.postMessage({ accessToken }, window.opener.location.origin);

      // Optionally close the popup and navigate back
      window.close();
    } else {
      // Navigate back to the main app if accessed directly
      navigate("/super-duper-snippet");
    }
  }, [navigate]);

  return <p>Redirecting...</p>;
};

export default Callback;
