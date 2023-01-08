import styled from "styled-components";
import { Link } from "react-router-dom";
import { AiOutlineDown, AiOutlineSearch, AiFillHome } from "react-icons/ai";
import Logoimg from "../../assets/images/linkr.svg"
import { UserContext } from "../../contexts/UserContext.js";
import { useContext, useState } from "react";
import SearchBarComponent from "./SearchBarComponent.js";

export default function Navbar() {
    const {user} = useContext(UserContext);

    return(
        <Container>
            <LogoContainer>
                <Logo src={Logoimg}/>
            </LogoContainer>
            <SearchBarContainer>
                <SearchBarComponent />
            </SearchBarContainer>
            <Menu>
                <Link to="/timeline" >
                    <HomeButton >
                        <AiFillHome />
                    </HomeButton>
                </Link>
                <UserDiv>
                    <AiOutlineDown/>
                    <UserPic src={user.profile_picture} alt="User picture"/>
                </UserDiv>
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
`
const LogoContainer = styled.div`
    width: 160px;
    display: flex;
    align-items: center;

`
const Logo = styled.img`
    width: 78px;
    margin-left: 10px;
`

const Menu = styled.div`
    width: 160px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media (max-width: 950px) {
            width: 140px;
        }
`
const HomeButton = styled.div`
    cursor: pointer;
    svg {
        font-size: 30px;
        color: white;
    }

`
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
`
const UserPic = styled.img`
    width: 53px;
    height: 53px;
    border-radius: 26.5px;
`

const SearchBarContainer = styled.div`
        width: 563px;
        min-height: 45px;
        position: relative;

        @media (max-width: 950px) {
            display: none;
        }
`