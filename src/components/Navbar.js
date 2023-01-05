import styled from "styled-components";
import { AiOutlineDown } from "react-icons/ai";
import Logoimg from "../assets/images/linkr.svg"
import "../assets/styles/icons.css"
import { UserContext } from "../contexts/UserContext.js";
import { useContext } from "react";

export default function Navbar() {

    const {user} = useContext(UserContext);

    return(
        <Container>
            <Logo src={Logoimg}/>
            <UserDiv>
                <AiOutlineDown className="user-img"/>
                <UserPic src={user.profile_picture} alt="User picture"/>
            </UserDiv>
        </Container>
    )
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
`
const Logo = styled.img`
    width: 78px;
    margin-left: 10px;
`
const UserDiv = styled.div`
    width: 95px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 13px;
`

const UserPic = styled.img`
    width: 53px;
    height: 53px;
    border-radius: 26.5px;
`