import styled from "styled-components";
import { Link } from "react-router-dom";
import { AiOutlineDown, AiOutlineSearch, AiFillHome, AiOutlineUp } from "react-icons/ai";
import Logoimg from "../../assets/images/linkr.svg";
import { UserContext } from "../../contexts/UserContext.js";
import { useContext, useState } from "react";
import api from "../../services/api";
import { DebounceInput } from "react-debounce-input";
import SearchResultItem from "./SearchResultItem.js";

export default function Navbar() {
  const { user } = useContext(UserContext);
  const [queryName, setQueryName] = useState("");
  const [queryResult, setQueryResult] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [logoutOpen, setLogOutOpen] = useState(false);

  async function searchUsers(e) {
    const query = e.target.value;
    setQueryName(e.target.value);

    if (e.target.value.length === 0) {
      setShowResults(false);
      return;
    }

    const queryString = `?name=${query.replace(" ", "+")}`;
    try {
      const result = await api.getUsersByName(queryString);
      console.log(result);
      setQueryResult(result.data);
      setShowResults(true);
    } catch (err) {
      console.log(err);
      alert(err.message);
      setQueryResult([]);
    }
  }

  return (
    <Container>
      <LogoContainer>
        <Logo src={Logoimg} />
      </LogoContainer>
      <SearchBarContainer>
        <SearchBar>
          <DebounceInput
            minLength={3}
            debounceTimeout={300}
            onChange={searchUsers}
            placeholder="Search for people"
          />
          <AiOutlineSearch />
        </SearchBar>
        <ContainerQueryResult showResults={showResults}>
          {queryResult.map((u) => (
            <SearchResultItem user={u} />
          ))}
        </ContainerQueryResult>
      </SearchBarContainer>
      <Menu>
        <Link to="/timeline">
          <HomeButton>
            <AiFillHome />
          </HomeButton>
        </Link>
        <UserDiv>
          {logoutOpen 
            ? <AiOutlineUp onClick={() => setLogOutOpen(false)} style={{cursor: "pointer"}} /> 
            : <AiOutlineDown onClick={() => setLogOutOpen(true)} style={{cursor: "pointer"}} />}
          <UserPic src={user.profile_picture} alt="User picture" />
        </UserDiv>
        {logoutOpen
            &&  <LogOutMenu>
                    <Link to={"/"} style={{textDecoration: "none", color: "white"}}>
                        <p style={{cursor:"pointer"}}>Logout</p>
                    </Link>
                </LogOutMenu>}
      </Menu>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 68px;
  background-color: #151515;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  z-index: 10;
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
`;
const HomeButton = styled.div`
  cursor: pointer;
  svg {
    font-size: 30px;
    color: white;
    margin-right: 0px;
  }
`;
const UserDiv = styled.div`
  width: 95px;
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
`;
const SearchBar = styled.div`
  width: 563px;
  height: 45px;
  background: #ffffff;
  border-radius: 8px;
  padding: 0 14px;
  font-family: "Lato";
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;

  svg {
    font-size: 23px;
    color: #c6c6c6;
  }

  input {
    width: 500px;
    height: 45px;
    outline: none;

    &::placeholder {
      width: 146px;
      height: 23px;
      font-family: "Lato";
      font-weight: 400;
      font-size: 19px;
      color: #c6c6c6;
    }
  }
`;
const ContainerQueryResult = styled.div`
  width: 563px;
  height: 155px;
  padding: 24px 17px;
  position: absolute;
  left: 0;
  top: 35px;
  background: #e7e7e7;
  border-radius: 8px;
  z-index: 1;
  display: ${(props) => (props.showResults ? "flex" : "none")};
  flex-direction: column;
  gap: 15px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #999898;
    border-radius: 15px;
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
    }
`
