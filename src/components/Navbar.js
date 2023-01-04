import styled from "styled-components";
import { AiOutlineDown } from "react-icons/ai";
import Logoimg from "../assets/images/linkr.svg"
import "../assets/styles/icons.css"

export default function Navbar() {
    return(
        <Container>
            <Logo src={Logoimg}/>
            <UserDiv>
                <AiOutlineDown className="user-img"/>
                {/* <UserPic src={userPic} alt="User picture"/> */}
                <UserPic src="https://s1.r29static.com/bin/entry/b52/0,46,460,460/1200x1200,80/1471901/image.jpg" alt="User picture"/>
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