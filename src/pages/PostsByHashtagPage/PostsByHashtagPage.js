import PageContainer from "../../components/PageContainer";
import MainContent from "../../components/MainContent";
import Title from "../../components/Title";
import { useLocation, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Post from "../../components/Post";
import HashtagTable from "../../components/HashtagTable/HashtagTable";
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function PostsByHashtagPage() {
  const [posts, setPosts] = useState(null);
  const { hashtag } = useParams();
  const { state } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const resp = await api.getPostsByHashtagId(state);
        setPosts(resp.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPosts();
  }, []);

  if (!posts) {
    return <div>Loading</div>;
  }

  return (
    <>
      <Navbar />
      <PageContainer>
        <MainContent>
          <Title title={hashtag} />
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </MainContent>
        <HashtagTable />
      </PageContainer>
    </>
  );
}
