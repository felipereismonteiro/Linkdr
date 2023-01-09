import PageContainer from "../../components/Container/Container";
import MainContent from "../../components/MainContent/MainContent";
import Title from "../../components/Title/Title";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/NavBar/Navbar";
import Post from "../../components/Post/Post";
import SearchBarComponent from "../../components/NavBar/SearchBarComponent.js";
import HashtagTable from "../../components/HashtagTable/HashtagTable";
import { useEffect, useState, useContext } from "react";
import api from "../../services/api";
import styled from "styled-components";
import { TokenContext } from "../../contexts/TokenContext.js";

export default function PostsByHashtagPage() {
  const [posts, setPosts] = useState(null);
  const { hashtag } = useParams();
  const { token } = useContext(TokenContext);
  const userData = JSON.parse(localStorage.getItem("userData"))
  const navigate = useNavigate()
  
  useEffect(() => {
    if(!userData) {
        navigate("/")
    }
}, [])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const resp = await api.getPostsByHashtag(hashtag, token);
        setPosts(resp.data);
      } catch (err) {
        console.log(err);
      }
    };
    if(token) {
      fetchPosts();
    } 
    
  }, [hashtag, token]);

  if(!userData) {
    return
  }

  return (
    <>
      <Navbar />
      <PageContainer>
      <SearchBarContainer>
            <SearchBarComponent />
      </SearchBarContainer>
      {!posts ? 
          <Loading>Loading...</Loading>
           :
        <>
        <MainContent>
          <Title title={hashtag} showHashtag={true} />
           {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </MainContent>
        <HashtagTable />
        </>
      } 
      </PageContainer>
    </>
  );
}

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
const Loading = styled.p`
  font-family: 'Oswald';
  font-weight: 700;
  font-size: 24px;
  color: #ffffff;
  text-align: center;
  margin-top: 75px;
`;
