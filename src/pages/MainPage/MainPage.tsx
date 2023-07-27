import { useEffect, useState, useCallback } from "react";
import logoname from "../../assets/images/logoname.png";
import "../../assets/css/MainPage.css";
import LoginButton from "./components/LoginButton";
import { Button as MaterialButton } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import NumberList from "./components/RepoList";
import { UserInfo } from "../../apis/UserServiceType";
import { getRepoList } from "../../apis/RepoListapi";

const buttonStyles = css`
  background-color: gray;
  padding: 10px 20px;
  border: none;
  border-radius: 1000px;
  position: absolute;
  text-align: center;
  font-weight: bold;
  top: 63.2%;
  right: 5%;
  weight: 19vw;
  height: 5vh;

  @font-face {
    font-family: Inter';
    src: url(../../fonts/Inter-Bold.ttf) format('truetype');
  }

  font-family: 'Inter';
  `;

const StyledButton = styled(MaterialButton)`
  ${buttonStyles}
`;
interface MainProps {
  userInfo?: Partial<UserInfo>;
}

const Main: React.FC<MainProps> = ({ userInfo }) => {
  const navigate = useNavigate();
  const [repoData, setRepoData] = useState([]);
  let info = localStorage.getItem("userInfo");
  if (!info) return (<>error</>);
  let parsedInfo = JSON.parse(info) as UserInfo;
  let userLogin = parsedInfo.login;

  const getRepo = useCallback(() => {
    getRepoList(userLogin)
      .then(response => {
        console.log(response.data);
        setRepoData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [userLogin]);

  useEffect(() => {
    getRepo();
  }, [getRepo]);

  return (
    <div className="main">
      <img src={logoname} className="logoname" alt="logoname" />
      {localStorage.getItem("isLogin") ? (
        <>
          <StyledButton
            variant="contained"
            startIcon={<DescriptionIcon />}
            onClick={() => navigate("/about")}
          >
            Learn More..
          </StyledButton>
          {repoData !== null && (
            <NumberList repo={repoData} />
          )}
        </>
      ) : (
        <div>
          <LoginButton />
        </div>
      )}
    </div>
  );
}

export default Main;
