import PageContainer from "../../components/Container/Container";
import HashtagTable from "../../components/HashtagTable/HashtagTable.js";
import MainContent from "../../components/MainContent/MainContent";
import Title from "../../components/Title/Title";
import { useParams } from "react-router-dom";
import Navbar from "../../components/NavBar/Navbar";
import Post from "../../components/Post/Post";
import SearchBarComponent from "../../components/NavBar/SearchBarComponent.js";
import { useEffect, useState, useContext } from "react";
import api from "../../services/api";
import styled from "styled-components"
import { TokenContext } from "../../contexts/TokenContext.js";

export default function UserPage() {
  const [posts, setPosts] = useState(null);
  const { token } = useContext(TokenContext);

  const { id } = useParams();

  useEffect( () => {
    
    renderPosts();
  }, [id]);

  const renderPosts = async () => {
    try {
      const result = await api.getPostsByUserId(id, token);
      setPosts(result.data)
    } catch(err) {
      console.log(err.message)
    }
  }

  return (
    <>
      <Navbar />
      <PageContainer>
      <SearchBarContainer>
            <SearchBarComponent />
      </SearchBarContainer>
      {posts === null  ? (
            <Loading>Loading...</Loading>
          ) :
        <>
        <MainContent>
        <TitleContainer>
            <img src={posts[0].profile_picture}/>
            <Title title={`${posts[0].user_name}'s posts`} />
        </TitleContainer>
            { 
            posts.map((p) => <Post post={p} renderPosts={renderPosts}/>)
          }
        </MainContent>
        <HashtagTable />
        </>
      }
      </PageContainer>
    </>
  );
}

const TitleContainer = styled.div`
    display: flex;
    gap: 18px;

    img {
        width: 50px;
        height: 50px;
        border-radius: 26.5px;
    }
`

const Loading = styled.p`
  font-family: 'Oswald';
  font-weight: 700;
  font-size: 24px;
  color: #ffffff;
  text-align: center;
  margin-top: 75px;
`;

const SearchBarContainer = styled.div`
        width: 100vw;
        height: 82px;
        position: relative;
        margin-top: 10px;
        display: none;
        background-color: #333333;
        position: fixed;
        top: 45px;
        z-index: 5;
        @media (max-width: 950px) {
            display: flex;
            justify-content: center;
            align-items: center;
        }
`