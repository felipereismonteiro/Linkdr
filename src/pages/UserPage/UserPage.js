import PageContainer from "../../components/Container/Container";
import HashtagTable from "../../components/HashtagTable/HashtagTable.js";
import MainContent from "../../components/MainContent/MainContent";
import Title from "../../components/Title/Title";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/NavBar/Navbar";
import Post from "../../components/Post/Post";
import SearchBarComponent from "../../components/NavBar/SearchBarComponent.js";
import { useEffect, useState, useContext } from "react";
import api from "../../services/api";
import styled from "styled-components";
import { TokenContext } from "../../contexts/TokenContext.js";
import FollowStatusButton from "../../components/FollowStatusButton/FollowStatusButton";
import { UserContext } from "../../contexts/UserContext";

export default function UserPage() {
  const [data, setData] = useState(null);
  const [update, setUpdate]=useState(false);
  const { token } = useContext(TokenContext);
  const { user } = useContext(UserContext);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();
  console.log(user);
  const { id } = useParams();

  useEffect(() => {
    if (!userData) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (token) {
      renderPosts();
    }
  }, [id, token, update]);

  const renderPosts = async () => {
 
    try {
      const result = await api.getPostsByUserId(id, token);
      setData(result.data);
      console.log(result.data)
    } catch (err) {
      console.log(err.message);
    }
  };

  if (!userData) {
    return;
  }

  return (
    <>
      <Navbar />
      <PageContainer>
        <SearchBarContainer>
          <SearchBarComponent />
        </SearchBarContainer>
        {data === null ? (
          <Loading>Loading...</Loading>
        ) : (
          <>
            <MainContent>
              <TitleContainer>
                <img src={data.posts[0].profile_picture} alt="profile" />
                <Title title={`${data.posts[0].user_name}'s posts`} />
                {user.id !== Number(id) && (
                  <FollowStatusButton isFollowed={data.is_followed} setUpdate={setUpdate} id={id} update={update}/>
                )}
              </TitleContainer>
              {data.posts.map((p) => (
                <Post key={p.post_share_id} post={p} renderPosts={renderPosts} />
              ))}
            </MainContent>
            <HashtagTable />
          </>
        )}
      </PageContainer>
    </>
  );
}

const TitleContainer = styled.div`
  display: flex;
  gap: 18px;
  position: relative;

  img {
    width: 50px;
    height: 50px;
    border-radius: 26.5px;
  }
`;

const Loading = styled.p`
  font-family: "Oswald";
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
`;
