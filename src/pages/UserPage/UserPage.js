import PageContainer from '../../components/Container/Container';
import SideBar from '../../components/SideBar/SideBar.js';
import PostsContainer from '../../components/FeedContainer/FeedContainer';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/NavBar/Navbar';
import Post from '../../components/Post/Post';
import SearchBarComponent from '../../components/NavBar/SearchBarComponent.js';
import { useEffect, useState, useContext, useRef } from 'react';
import api from '../../services/api';
import styled from 'styled-components';
import { TokenContext } from '../../contexts/TokenContext.js';
import FollowStatusButton from '../../components/FollowStatusButton/FollowStatusButton';
import { UserContext } from '../../contexts/UserContext';
import InfiniteScroll from 'react-infinite-scroller';
import { ScrollLoading } from '../../components/ScrollLoading/ScrollLoading';

export default function UserPage() {
  const [personalData, setPersonalData] = useState(null);
  const [update, setUpdate] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [posts, setPosts] = useState([]);
  const [followStatus, setFollowStatus] = useState(null);
  const { token } = useContext(TokenContext);
  const { user } = useContext(UserContext);
  const initialPage = useRef(1);
  const userData = JSON.parse(localStorage.getItem('userData'));
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!userData) {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    if (token) {
      renderPosts(initialPage.current);
    }
  }, [id, token, update]);

  const renderPosts = async (page) => {
    try {
      const result = await api.getPostsByUserId(id, page, token);
      console.log(result);
      setPersonalData(result.data.userInfo);
      setFollowStatus(result.data.is_followed);
      setPosts(result.data.posts);

      if (result.data.posts.length % 10 !== 0) {
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
          <ContentContainer>
            <ProfileBoard>
              <Cover cover={personalData.cover} />
              <ProfileInfoContainer>
                <UserInfo>
                  <ProfilePicture src={personalData.profile_picture} alt="profile" />
                  <MainInfo>
                    <UserName>{personalData.user_name}</UserName>
                    <Bio>{personalData.biography}</Bio>
                  </MainInfo>
                </UserInfo>
                {user.id !== Number(id) && <FollowStatusButton isFollowed={followStatus} id={id} />}
                <FollowersInfo>
                  <FollowersContainer>
                    <FollowersQuantity>
                      <span>{personalData.followers_quantity}</span> Followers
                    </FollowersQuantity>
                    <FollowersPictureDiv>
                      <SmallPic
                        index={0}
                        user={personalData.followers[0]}
                        src={personalData.followers[0]?.profile_picture}
                      />
                      <SmallPic
                        index={1}
                        user={personalData.followers[1]}
                        src={personalData.followers[1]?.profile_picture}
                      />
                      <SmallPic
                        index={2}
                        user={personalData.followers[2]}
                        src={personalData.followers[2]?.profile_picture}
                      />
                      <SmallPic
                        index={3}
                        user={personalData.followers[3]}
                        src={personalData.followers[3]?.profile_picture}
                      />
                      <SmallPic
                        index={4}
                        user={personalData.followers[4]}
                        src={personalData.followers[4]?.profile_picture}
                      />
                    </FollowersPictureDiv>
                  </FollowersContainer>
                  <FollowingContainer>
                    <FollowingQuantity>
                      <span>{personalData.following_quantity}</span> Following
                    </FollowingQuantity>
                    <FollowingPictureDiv>
                      <SmallPic
                        index={0}
                        user={personalData.following[0]}
                        src={personalData.following[0]?.profile_picture}
                      />
                      <SmallPic
                        index={1}
                        user={personalData.following[1]}
                        src={personalData.following[1]?.profile_picture}
                      />
                      <SmallPic
                        index={2}
                        user={personalData.following[2]}
                        src={personalData.following[2]?.profile_picture}
                      />
                      <SmallPic
                        index={3}
                        user={personalData.following[3]}
                        src={personalData.following[3]?.profile_picture}
                      />
                      <SmallPic
                        index={4}
                        user={personalData.following[4]}
                        src={personalData.following[4]?.profile_picture}
                      />
                    </FollowingPictureDiv>
                  </FollowingContainer>
                </FollowersInfo>
              </ProfileInfoContainer>
            </ProfileBoard>
            <Content>
              <Title>Posts</Title>
              <MainContent>
                <PostsContainer>
                  <InfiniteScroll
                    pageStart={1}
                    loadMore={renderPosts} // load more pass the next page to the function as a parameter when the scroll hits the viewport
                    hasMore={hasMore}
                    loader={<ScrollLoading />}
                  >
                    {posts.map((p) => (
                      <Post key={p.post_share_id} post={p} setUpdate={setUpdate} update={update} />
                    ))}
                  </InfiniteScroll>
                </PostsContainer>
                <SideBar />
              </MainContent>
            </Content>
          </ContentContainer>
        )}
      </PageContainer>
    </>
  );
}

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileBoard = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const Cover = styled.div`
  width: 965px;
  height: 222px;
  background: url(${(props) => props.cover});
  background-position: right;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 20px 20px 0px 0px;
`;

const ProfileInfoContainer = styled.div`
  width: 965px;
  height: 240px;
  display: flex;
  flex-direction: column;
  background: #232323;
  position: relative;
  border-radius: 0px 0px 20px 20px;
`;

const UserInfo = styled.div`
  width: 600px;
  height: 160px;
  display: flex;
  align-items: flex-end;
  position: absolute;
  left: 35px;
  top: -40px;
  /* background-color: yellow; */
`;

const ProfilePicture = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
`;

const MainInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 11px;
  margin-bottom: 20px;
`;

const UserName = styled.p`
  font-family: 'Oswald';
  font-weight: 700;
  font-size: 38px;
  color: #e4e6eb;
  margin-top: 15px;
  margin-bottom: 10px;
`;

const Bio = styled.p`
  font-family: 'Oswald';
  font-weight: 500;
  font-size: 23px;
  line-height: 37px;

  color: #e4e6eb;
`;
const FollowersInfo = styled.div`
  width: 400px;
  height: 80px;
  display: flex;
  gap: 42px;
  position: absolute;
  left: 48px;
  bottom: 10px;
  /* background-color: blue; */
`;

const FollowersContainer = styled.div`
  width: 150px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  /* background-color: red; */
`;

const FollowersQuantity = styled.p`
  font-family: 'Oswald';
  font-style: normal;
  font-weight: 400;
  font-size: 23px;
  line-height: 37px;
  color: #e4e6eb;

  span {
    font-family: 'Oswald';
    font-weight: 700;
    font-size: 23px;
    line-height: 37px;
    color: #fff;
  }
`;

const FollowersPictureDiv = styled.div`
  width: 150px;
  height: 32px;
  position: relative;
`;

const SmallPic = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: absolute;
  bottom: 0;
  left: ${(props) => `calc(${props.index} * 26px)`};
  z-index: ${(props) => `calc(5/(${props.inde} + 1))`};
  display: ${(props) => (props.user ? 'initial' : 'none')};
`;

const FollowingContainer = styled.div`
  width: 150px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FollowingQuantity = styled.p`
  font-family: 'Oswald';
  font-style: normal;
  font-weight: 400;
  font-size: 23px;
  line-height: 37px;
  color: #e4e6eb;

  span {
    font-family: 'Oswald';
    font-weight: 700;
    font-size: 23px;
    line-height: 37px;
    color: #fff;
  }
`;

const FollowingPictureDiv = styled.div`
  width: 150px;
  height: 32px;
  position: relative;
`;

const Loading = styled.p`
  font-family: 'Oswald';
  font-weight: 700;
  font-size: 24px;
  color: #ffffff;
  text-align: center;
  margin-top: 45vh;
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

const Title = styled.h1`
  font-family: 'Oswald';
  font-weight: 700;
  font-size: 38px;
  color: #ffffff;
  font-family: 'Oswald', sans-serif;
  margin-bottom: 36px;
  margin-left: 35px;
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
