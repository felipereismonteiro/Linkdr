import PageContainer from "../../components/PageContainer";
import MainContent from "../../components/MainContent";
import Title from "../../components/Title";
import { useLocation, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Post from "../../components/Post";
import HashtagTable from "../../components/HashtagTable/HashtagTable";

export default function PostsByHashtagPage() {
  const { hashtag } = useParams();
  const location = useLocation();

  const post = {
    profile_picture: "teste",
    user_name: "teste",
    content: "teste",
    url: "teste",
  };
  return (
    <>
      <Navbar />
      <PageContainer>
        <MainContent>
          <Title title={hashtag} />
          <Post post={post} />
        </MainContent>
        <HashtagTable />
      </PageContainer>
    </>
  );
}
