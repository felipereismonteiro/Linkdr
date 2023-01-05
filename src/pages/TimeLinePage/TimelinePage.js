import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../../components/NavBar/Navbar.js";
import Post from "../../components/Post/Post.js";
import Title from "../../components/Title/Title.js";
import axios from "axios";
import PageContainer from "../../components/Container/Container.js";
import MainContent from "../../components/MainContent/MainContent.js";
import { PublishingForm } from "../../components/PublishForm/PublishingForm.js";
import HashtagTable from "../../components/HashtagTable/HashtagTable.js";

export default function TimelinePage() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    renderPosts();
  }, []);

  async function renderPosts() {
    try {
      const postsFound = await axios.get(
        "https://linkr-api-hhbp.onrender.com/posts"
      );
      // const postsFound = await axios.get("http://localhost:4000/posts");
      setPosts(postsFound.data);
      setLoading(false);
    } catch (err) {
      alert(
        "An error occured while trying to fetch the posts, please refresh the page"
      );
    }
  }

  return (
    <>
      <Navbar />
      <PageContainer>
        <MainContent>
          <Title title={"timeline"} />
          <PublishingForm renderPosts={renderPosts} />
          {loading ? (
            <Loading>Loading...</Loading>
          ) : posts.length === 0 ? (
            <NoPostsMessage>There are no posts yet</NoPostsMessage>
          ) : (
            posts.map((p) => <Post post={p} />)
          )}
        </MainContent>
        <HashtagTable />
      </PageContainer>
    </>
  );
}

const Loading = styled.p`
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
