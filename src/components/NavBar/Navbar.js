import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineDown, AiFillHome, AiOutlineUp } from "react-icons/ai";
import Logoimg from "../../assets/images/linkr.svg";
import { UserContext } from "../../contexts/UserContext.js";
import { useContext, useState, useEffect } from "react";
import SearchBarComponent from "./SearchBarComponent.js";
const userData = JSON.parse(localStorage.getItem("userData"))

export default function Navbar({renderPosts}) {
    const {user} = useContext(UserContext);
    const [logoutOpen, setLogOutOpen] = useState(false);
    const navigate = useNavigate();

  if(!user) {
    return
  }

    return(
        <Container>
            <LogoContainer>
                <Logo src={Logoimg}/>
            </LogoContainer>
            <SearchBarContainer>
                <SearchBarComponent />
            </SearchBarContainer>
            <Menu>
          <HomeButton onClick={() => {
            navigate("/timeline");
            renderPosts();
            window.scrollTo(0, 0);
          }}>
            <AiFillHome />
            {/* <div></div> */}
          </HomeButton>
        <UserDiv>
          {logoutOpen 
            ? <AiOutlineUp onClick={() => setLogOutOpen(false)} style={{cursor: "pointer"}} /> 
            : <AiOutlineDown onClick={() => setLogOutOpen(true)} style={{cursor: "pointer"}} />}
          <UserPic src={user.profile_picture} alt="User picture" />
        </UserDiv>
        {logoutOpen
            &&  <LogOutMenu>
                        <p onClick={() => {
                          localStorage.removeItem("userData")
                          navigate("/")
                        }}>Logout</p>
                </LogOutMenu>}
      </Menu>
            
        </Container>
    )
}

const Container = styled.div`
    width: 100vw;
    height: 68px;
    background-color: #151515;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    z-index: 20;
    padding: 0 17px;
`;

const LogoContainer = styled.div`
  width: 160px;
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  width: 78px;
  margin-left: 10px;
`;

const Menu = styled.div`
    width: 160px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media (max-width: 950px) {
            width: 140px;
        }
`;

const HomeButton = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 45px;
    height: 45px;
    gap: 3px;
    cursor: pointer;

    &:hover svg {
      font-size: 31px;
      filter: blur(0.5px);
      filter: drop-shadow(0 0 5px grey);
    }

    svg {
        font-size: 30px;
        color: white;
    }

    div {
      width: 80%;
      height: 2px;
      background-color: white;
      visibility: hidden;
    }

`;

const UserDiv = styled.div`
    width: 98px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 13px;
    svg {
        font-size: 23px;
        color: white;
    }
`;

const UserPic = styled.img`
  width: 53px;
  height: 53px;
  border-radius: 26.5px;
`;

const SearchBarContainer = styled.div`
        width: 563px;
        min-height: 45px;
        position: relative;

        @media (max-width: 950px) {
            display: none;
        }
`;


const LogOutMenu = styled.div`
    height: 50px;
    width: 150px;
    background-color: #171717;
    border-radius: 0px 0px 20px 20px;
    position: absolute; 
    top: 68px;
    right: -25px;
    display: flex;
    justify-content: center;
    align-items: center;
    & p {
        @import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');
        font-family: 'Lato', sans-serif;
        font-size: 20px;
        margin: 0px 20px 10px 0px;
        &:hover {
          font-size: 20.4px;
        }
    }  
`;