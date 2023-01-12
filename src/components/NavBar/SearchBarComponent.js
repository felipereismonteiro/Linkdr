import styled from "styled-components";
import api from "../../services/api";
import { DebounceInput } from "react-debounce-input";
import SearchResultItem from "./SearchResultItem.js";
import { MagnifyingGlass } from "react-loader-spinner";
import { useContext, useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { TokenContext } from "../../contexts/TokenContext";

export default function SearchBarComponent() {
  const [queryName, setQueryName] = useState("");
  const [queryResult, setQueryResult] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const { token } = useContext(TokenContext);

  async function searchUsers(e) {
    const query = e.target.value;
    setQueryName(e.target.value);

    if (e.target.value.length === 0) {
      setShowResults(false);
      setQueryResult(null);
      return;
    }
    setShowResults(true);
    const queryString = `?name=${query.replace(" ", "+")}`;
    try {
      const result = await api.getUsersByName(queryString, token);
      setQueryResult(result.data);
    } catch (err) {
      console.log(err);
      alert(err.message);
      setQueryResult([]);
    }
  }

  return (
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
      <ContainerQueryResult
        showResults={showResults}
        loading={
          queryResult === null || queryResult?.length === 0 ? true : false
        }
      >
        {queryResult === null ? (
          <MagnifyingGlass
            height="40"
            width="40"
            radius="9"
            margin="0 auto"
            color="grey"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        ) : queryResult.length === 0 ? (
          "User Not Found"
        ) : (
          queryResult.map((u) => (
            <SearchResultItem user={u} setShowResults={setShowResults} />
          ))
        )}
      </ContainerQueryResult>
    </SearchBarContainer>
  );
}

const SearchBarContainer = styled.div`
  width: 100%;
  min-height: 45px;
  position: relative;

  @media (max-width: 950px) {
    width: 90%;
  }
  @media (max-width: 650px) {
    width: 95%;
  }
`;

const SearchBar = styled.div`
  width: 100%;
  height: 45px;
  background: #ffffff;
  border-radius: 8px;
  padding: 0 14px;
  font-family: "Lato";
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  z-index: 10;

  &:hover {
    background-color: #f4f2f2;
  }

  svg {
    font-size: 23px;
    color: #c6c6c6;
  }

  input {
    width: 500px;
    height: 45px;
    outline: none;
    &:hover {
      background-color: #f4f2f2;
    }

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
  width: 100%;
  height: 155px;
  padding: 15px 12px;
  position: absolute;
  left: 0;
  top: 35px;
  background: #e7e7e7;
  border-radius: 8px;
  z-index: 1;
  display: ${(props) => (props.showResults ? "flex" : "none")};
  flex-direction: column;
  justify-content: ${(props) =>
    props.loading === true ? "center" : "flex-start"};
  align-items: ${(props) => (props.loading === true ? "center" : "flex-start")};
  gap: 4px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #999898;
    border-radius: 15px;
  }
`;
