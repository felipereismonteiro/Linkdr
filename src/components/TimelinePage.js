import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "./Navbar.js";
import Post from "./Post.js";
import Title from "./Title.js";
import axios from "axios";
import PageContainer from "./PageContainer.js";
import MainContent from "./MainContent.js";
import { PublishingForm } from "./PublishingForm.js";
import HashtagTable from "./HashtagTable/HashtagTable.js";

export default function TimelinePage() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    renderPosts();
    console.log("entrou no useEfect")
  }, []);

  async function renderPosts() {
    try {
    //   const postsFound = await axios.get(
    //     "https://linkr-api-hhbp.onrender.com/posts"
    //   );
      const postsFound = await axios.get("http://localhost:4000/posts");
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
