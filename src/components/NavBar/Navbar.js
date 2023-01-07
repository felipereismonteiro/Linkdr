import styled from "styled-components";
import { AiOutlineDown, AiOutlineSearch } from "react-icons/ai";
import Logoimg from "../../assets/images/linkr.svg"
import { UserContext } from "../../contexts/UserContext.js";
import { useContext, useState } from "react";
import api from "../../services/api";
import {DebounceInput} from 'react-debounce-input';
import SearchResultItem from "./SearchResultItem.js"

export default function Navbar() {
    const {user} = useContext(UserContext);
    const [queryName, setQueryName] = useState("")
    const [queryResult, setQueryResult] = useState([])
    const [showResults, setShowResults] = useState(false)

    async function searchUsers(e) {
        const query = e.target.value;
        setQueryName(e.target.value)
  
        if(e.target.value.length === 0) {
            setShowResults(false)
            return;
        }

        const queryString = `?name=${query.replace(" ", "+")}`
        try {
            const result = await api.getUsersByName(queryString)
            console.log(result)
            setQueryResult(result.data);
            setShowResults(true)

        } catch (err) {
            console.log(err)
            alert(err.message)
            setQueryResult([])
        }
    }


    return(
        <Container>
            <Logo src={Logoimg}/>
            <SearchBarContainer>
                <SearchBar>
                    <DebounceInput
                        minLength={3}
                        debounceTimeout={300}
                        onChange={searchUsers} placeholder="Search for people"/>
                    <AiOutlineSearch/>
                </SearchBar>
                <ContainerQueryResult showResults={showResults}>
                    {queryResult.map((u) => <SearchResultItem user={u}/>)}
                </ContainerQueryResult>
            </SearchBarContainer>
            <UserDiv>
                <AiOutlineDown/>
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
`

const SearchBar = styled.div`
    width: 563px;
    height: 45px;
    background: #FFFFFF;
    border-radius: 8px;
    padding: 0 14px;
    font-family: 'Lato';
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;
    
    svg {
        font-size: 23px;
        color: #C6C6C6;
    }

    input {
        width: 500px;
        height: 45px;
        outline: none;

        &::placeholder {
        width: 146px;
        height: 23px;
        font-family: 'Lato';
        font-weight: 400;
        font-size: 19px;
        color: #C6C6C6;
        }
    }
    
`

const ContainerQueryResult = styled.div`
    width: 563px;
    height: 155px;
    padding: 24px 17px;
    position: absolute;
    left: 0;
    top: 35px;
    background: #E7E7E7;
    border-radius: 8px;
    z-index: 1;
    display: ${props => props.showResults ? "flex" : "none"};
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
`