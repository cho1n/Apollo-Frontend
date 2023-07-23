import { useState, useEffect, useCallback } from "react";
import github from "../../../assets/images/github_logo.png";
import "../../../assets/css/button.css";
import { getAuthenticationService } from "../../../apis/GetAuthenticationService";
import { useNavigate } from "react-router-dom";

export function handleLogout() {
  localStorage.removeItem("isLogin");
  window.location.href = "/";
}

function LoginButton() {
  const navigate = useNavigate();
  const handleLogin = () => {
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=aaf4ee42ea6e3043265c`;
    window.location.href = githubAuthUrl;
    // localStorage.setItem("isLogin", JSON.stringify(true));
  };

  const [accessToken, setAccessToken] = useState("");

  // const handleCallback = () => {
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const code = urlParams.get("code");

  //   if (code) {
  //     setAccessToken(code);
  //     console.log(accessToken);
  //     getAuthenticationService(code)
  //       .then((res) => {
  //         console.log(res);
  //         localStorage.setItem("isLogin", JSON.stringify(true));
  //         localStorage.setItem("userInfo", JSON.stringify(res.data));
  //         navigate("/wait");
  //       })
  //       .catch((err) => {
  //         console.log("here");
  //         console.log(err);
  //       });
  //   } else {
  //     console.log("Error: code not found");
  //   }
  // };

  const handleCallback = useCallback(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      setAccessToken(code);
      console.log(accessToken);
      getAuthenticationService(code)
        .then((res) => {
          console.log(res);
          localStorage.setItem("isLogin", JSON.stringify(true));
          localStorage.setItem("userInfo", JSON.stringify(res.data));
          navigate("/wait");
        })
        .catch((err) => {
          console.log("here");
          console.log(err);
        });
    } else {
      console.log("Error: code not found");
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    handleCallback();
  }, [handleCallback]);

  return (
    <button className="login" onClick={handleLogin}>
      <img src={github} className="github" alt="github" />
      Log in with GitHub
    </button>
  );
}

export default LoginButton;
