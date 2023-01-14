import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Navbar from "../../components/NavBar/Navbar.js";
import Post from "../../components/Post/Post.js";
import Title from "../../components/Title/Title.js";
import PageContainer from "../../components/Container/Container.js";
import MainContent from "../../components/MainContent/MainContent.js";
import HashtagTable from "../../components/HashtagTable/HashtagTable.js";
import api from "../../services/api.js";
import { PublishingForm } from "../../components/PublishingForm/PublishingForm.js";
import SearchBarComponent from "../../components/NavBar/SearchBarComponent.js";
import { TokenContext } from "../../contexts/TokenContext.js";
import { useNavigate } from "react-router-dom";
import TimelineUpdateButton from "../../components/TimelineUpdateButton/TimelineUpdateButton.js";
import moment from "moment";
import { ScrollLoading } from "../../components/ScrollLoading/ScrollLoading";
import InfiniteScroll from "react-infinite-scroller"; 


export default function TimelinePage() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [followedAccounts, setFollowedAccounts] = useState();
  const initialPage = useRef(1);
  const [hasMore, setHasMore] = useState(true);
  const { token } = useContext(TokenContext);
  const [timestampPostgre, setTimestampPostgre] = useState((moment(Date.now()).utc().format('YYYY-MM-DDTHH:mm:ss.SSSZ')));
  const [newPostsCounter, setNewPostsCounter] = useState(0);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();
  const [update, setUpdate] = useState(false);


  useEffect(() => {
    if (!userData) {
      navigate("/");
    }
      const interval = setInterval(countNewPosts, 25000)
      return () => clearInterval(interval);

  }, [timestampPostgre, token]);


  useEffect(() => {
    if (token) {
      renderPosts(initialPage.current);
    }
  }, [loading, token, update]);

  async function countNewPosts () {
    try {
      const newPosts  = await api.countNewPosts(token, timestampPostgre);
      setNewPostsCounter(Number(newPosts.data.new_posts))
    } catch(err) {
      console.log(err.message)
    }
    
  }
  
  async function renderPosts(page) {

    try {
      const postsFound = await api.getPosts(page, token);
      setPosts(postsFound.data.posts);
      // console.log(postsFound.data);
      setFollowedAccounts(postsFound.data.accounts_you_follow);
      setLoading(false);

      if (postsFound.data.posts.length % 10 !== 0) {
        setHasMore(false);
      }
    } catch (err) {
      alert(
        "An error occured while trying to fetch the posts, please refresh the page"
      );
    }
  }

  async function renderOlderPosts(page) {

    try {
      const postsFound = await api.getOlderPosts(timestampPostgre, page, token);
      setPosts(postsFound.data.posts);
      // console.log(postsFound.data);
      setFollowedAccounts(postsFound.data.accounts_you_follow);
      setLoading(false);

      if (postsFound.data.posts.length % 10 !== 0) {
        setHasMore(false);
      }
    } catch (err) {
      alert(
        "An error occured while trying to fetch the posts, please refresh the page"
      );
    }
  }


  if (!userData) {
    return;
  }

  return (
    <>
      <Navbar renderPosts={renderPosts} />
      <PageContainer>
        <SearchBarContainer>
          <SearchBarComponent />
        </SearchBarContainer>
        {loading ? (
          <Loading>Loading...</Loading>
        ) : (
          <>
            <MainContent>
              <Title title={"timeline"} />
              <PublishingForm renderPosts={renderPosts} />
              {newPostsCounter !== 0 && <TimelineUpdateButton newPostsCounter={newPostsCounter} setNewPostsCounter={setNewPostsCounter} setTimestampPostgre={setTimestampPostgre} update={update} setUpdate={setUpdate}/>}
              {followedAccounts.length === 0 && (
                <NoAccountsFollowedMessage>
                  You don't follow anyone yet. Search for new friends!
                </NoAccountsFollowedMessage>
              )}

              {followedAccounts.length !== 0 && posts.length === 0 && (
                <NoPostsMessage>There are no posts yet</NoPostsMessage>
              )}

              {posts.length !== 0 && (
                <InfiniteScroll
                  pageStart={1}
                  hasMore={hasMore}
                  loadMore={renderOlderPosts}
                  loader={<ScrollLoading />}
                >
                  {posts.map((p, i) => (
                    <Post
                      post={p}
                      key={p.post_share_id}
                      renderPosts={renderPosts}
                      update={update}
                      setUpdate={setUpdate}
                    />
                  ))}
                </InfiniteScroll>
              )}
            </MainContent>
            <HashtagTable />
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

const NoPostsMessage = styled.p`
  font-weight: 700;
  font-size: 24px;
  color: #ffffff;
  text-align: center;
  margin-top: 75px;
`;

const NoAccountsFollowedMessage = styled.p`
  font-weight: 700;
  font-size: 24px;
  color: #ffffff;
  text-align: center;
  margin-top: 75px;
`;
