import PageContainer from '../../components/Container/Container';
import FeedContainer from '../../components/FeedContainer/FeedContainer';
import Title from '../../components/Title/Title';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/NavBar/Navbar';
import Post from '../../components/Post/Post';
import SearchBarComponent from '../../components/NavBar/SearchBarComponent.js';
import SideBar from '../../components/SideBar/SideBar';
import { useEffect, useState, useContext, useRef } from 'react';
import api from '../../services/api';
import styled from 'styled-components';
import { TokenContext } from '../../contexts/TokenContext.js';
import InfiniteScroll from 'react-infinite-scroller';
import { ScrollLoading } from '../../components/ScrollLoading/ScrollLoading';

export default function PostsByHashtagPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const { hashtag } = useParams();
  const [update, setUpdate] = useState(false);
  const { token } = useContext(TokenContext);
  const userData = JSON.parse(localStorage.getItem('userData'));
  const navigate = useNavigate();
  const initialPage = useRef(1);

  useEffect(() => {
    setPosts([]);
    setHasMore(true);
    setLoading(true);
  }, [hashtag]);

  useEffect(() => {
    if (!userData) {
      navigate('/');
    }
  }, []);

  const renderPosts = async (page) => {
    console.log('fui chamada');
    try {
      const resp = await api.getPostsByHashtag(hashtag, page, token);
      console.log(resp.data);
      setLoading(false);
      setPosts(resp.data);

      if (resp.data.length % 10 !== 0) {
        setHasMore(false);
      }
      console.log();
      console.log(resp.data.length);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (token) {
      renderPosts(initialPage.current);
    }
  }, [hashtag, token, update]);

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
            <Content>
              <Title title={hashtag} showHashtag={true} />
              <MainContent>
                <FeedContainer>
                  <InfiniteScroll pageStart={1} hasMore={hasMore} loadMore={renderPosts} loader={<ScrollLoading />}>
                    {posts.map((post) => (
                      <Post key={post.post_share_id} post={post} update={update} setUpdate={setUpdate} />
                    ))}
                  </InfiniteScroll>
                </FeedContainer>
                <SideBar />
              </MainContent>
            </Content>
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
  font-family: 'Oswald';
  font-weight: 700;
  font-size: 24px;
  color: #ffffff;
  text-align: center;
  margin-top: 75px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
`;

const MainContent = styled.div`
  display: flex;
  gap: 25px;
  position: relative;
`;
