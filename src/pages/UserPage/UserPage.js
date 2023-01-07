import PageContainer from "../../components/Container/Container";
import HashtagTable from "../../components/HashtagTable/HashtagTable.js";
import MainContent from "../../components/MainContent/MainContent";
import Title from "../../components/Title/Title";
import { useParams } from "react-router-dom";
import Navbar from "../../components/NavBar/Navbar";
import Post from "../../components/Post/Post";
import { useEffect, useState, useContext } from "react";
import api from "../../services/api";
import { UserContext } from "../../contexts/UserContext.js";
import styled from "styled-components"

export default function UserPage() {
  const [posts, setPosts] = useState([]);
  const { userPageInfo } = useContext(UserContext);

  const { id } = useParams();

  useEffect( () => {

    const getPosts = async () => {
      try {
        const result = await api.getPostsByUserId(id);
        setPosts(result.data)
      } catch(err) {
        console.log(err.message)
      }
    }
    
    getPosts();
  }, []);

  return (
    <>
      <Navbar />
      <PageContainer>
        <MainContent>
        <TitleContainer>
            <img src={userPageInfo.profile_picture}/>
            <Title title={`${userPageInfo.user_name}'s posts`} />
        </TitleContainer>
            {posts === null ? (
            <Loading>Loading...</Loading>
          ) : (
            posts.map((p) => <Post post={p}/>)
          )}
        </MainContent>
        <HashtagTable />
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