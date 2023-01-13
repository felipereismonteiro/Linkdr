import PageContainer from "../../components/Container/Container";
import HashtagTable from "../../components/HashtagTable/HashtagTable.js";
import MainContent from "../../components/MainContent/MainContent";
import Title from "../../components/Title/Title";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/NavBar/Navbar";
import Post from "../../components/Post/Post";
import SearchBarComponent from "../../components/NavBar/SearchBarComponent.js";
import { useEffect, useState, useContext, useRef } from "react";
import api from "../../services/api";
import styled from "styled-components";
import { TokenContext } from "../../contexts/TokenContext.js";
import FollowStatusButton from "../../components/FollowStatusButton/FollowStatusButton";
import { UserContext } from "../../contexts/UserContext";
import InfiniteScroll from "react-infinite-scroller";
import { ScrollLoading } from "../../components/ScrollLoading/ScrollLoading";

export default function UserPage() {
  const [personalData, setPersonalData] = useState(null);
  const [update, setUpdate] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [posts, setPosts] = useState([]);
  const [followStatus, setFollowStatus] = useState(null);
  const { token } = useContext(TokenContext);
  const { user } = useContext(UserContext);
  const initialPage = useRef(1);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!userData) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (token) {
      renderPosts(initialPage.current);
    }
  }, [id, token]);

  const renderPosts = async (page) => {
    console.log(page);
    try {
      const result = await api.getPostsByUserId(id, page, token);

      setPersonalData(result.data.userInfo);
      setFollowStatus(result.data.is_followed);
      setPosts([...posts, ...result.data.posts]);
      console.log(result.data.posts.length, result.data.posts);
      if (result.data.posts.length < 10) {
        setHasMore(false);
      }
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
        {personalData === null ? (
          <Loading>Loading...</Loading>
        ) : (
          <>
            <MainContent>
              <TitleContainer>
                <img src={personalData.profile_picture} alt="profile" />
                <Title title={`${personalData.user_name}'s posts`} />
                {user.id !== Number(id) && (
                  <FollowStatusButton
                    isFollowed={followStatus.is_followed}
                    setUpdate={setUpdate}
                    id={id}
                    update={update}
                  />
                )}
              </TitleContainer>
              <InfiniteScroll
                pageStart={1}
                loadMore={renderPosts} // load more pass the next page to the function as a parameter when the scroll hits the viewport
                hasMore={hasMore}
                loader={<ScrollLoading />}
              >
                {posts.map((p) => (
                  <Post
                    key={p.post_share_id}
                    post={p}
                    renderPosts={renderPosts}
                  />
                ))}
              </InfiniteScroll>
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
