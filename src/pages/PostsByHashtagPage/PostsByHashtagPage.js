import PageContainer from "../../components/Container/Container";
import MainContent from "../../components/MainContent/MainContent";
import Title from "../../components/Title/Title";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/NavBar/Navbar";
import Post from "../../components/Post/Post";
import SearchBarComponent from "../../components/NavBar/SearchBarComponent.js";
import HashtagTable from "../../components/HashtagTable/HashtagTable";
import { useEffect, useState, useContext, useRef } from "react";
import api from "../../services/api";
import styled from "styled-components";
import { TokenContext } from "../../contexts/TokenContext.js";
import InfiniteScroll from "react-infinite-scroller";
import { ScrollLoading } from "../../components/ScrollLoading/ScrollLoading";

export default function PostsByHashtagPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const { hashtag } = useParams();
  const { token } = useContext(TokenContext);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();
  const initialPage = useRef(1);

  useEffect(() => {
    if (!userData) {
      navigate("/");
    }
  }, []);

  const fetchPosts = async (page) => {
    try {
      const resp = await api.getPostsByHashtag(hashtag, page, token);

      setLoading(false);
      setPosts([...posts, ...resp.data]);

      if (resp.data.length < 10) {
        setHasMore(false);
      }

      console.log(resp.data.length);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchPosts(initialPage.current);
    }
  }, [hashtag, token]);

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
        {loading ? (
          <Loading>Loading...</Loading>
        ) : (
          <>
            <MainContent>
              <Title title={hashtag} showHashtag={true} />
              <InfiniteScroll
                pageStart={1}
                hasMore={hasMore}
                loadMore={fetchPosts}
                loader={<ScrollLoading />}
              >
                {posts.map((post) => (
                  <Post
                    key={post.id}
                    post={post}
                    setPosts={setPosts}
                    setLoading={setLoading}
                    setHasMore={setHasMore}
                  />
                ))}
              </InfiniteScroll>
            </MainContent>
            <HashtagTable
              setPosts={setPosts}
              setLoading={setLoading}
              setHasMore={setHasMore}
            />
          </>
        )}
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
`;
const Loading = styled.p`
  font-family: "Oswald";
  font-weight: 700;
  font-size: 24px;
  color: #ffffff;
  text-align: center;
  margin-top: 75px;
`;
