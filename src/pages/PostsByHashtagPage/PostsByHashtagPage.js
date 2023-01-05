import PageContainer from "../../components/Container/Container";
import MainContent from "../../components/MainContent/MainContent";
import Title from "../../components/Title/Title";
import { useParams } from "react-router-dom";
import Navbar from "../../components/NavBar/Navbar";
import Post from "../../components/Post/Post";
import HashtagTable from "../../components/HashtagTable/HashtagTable";
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function PostsByHashtagPage() {
  const [posts, setPosts] = useState(null);
  const { hashtag } = useParams();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const resp = await api.getPostsByHashtag(hashtag);
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
          <Title title={hashtag} showHashtag={true} />
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </MainContent>
        <HashtagTable />
      </PageContainer>
    </>
  );
}
