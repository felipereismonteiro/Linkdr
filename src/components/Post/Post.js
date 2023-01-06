import styled from "styled-components";
import { ReactTagify } from "react-tagify";
import { useNavigate } from "react-router-dom";

export default function Post({ post }) {
  const navigate = useNavigate();
  const tagStyle = {
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  };

  function goToPostsByHashtagPage(tag) {
    const formattedTag = tag.replace("#", ""); 
    navigate(`/hashtag/${formattedTag}`);
  }

  return (
    <Container>
      <UserPic src={post.profile_picture} alt="User picture" />
      <PostContent>
        <Username>{post.user_name}</Username>
        <ReactTagify
          tagStyle={tagStyle}
          tagClicked={(tag) => goToPostsByHashtagPage(tag)}
        >
          <Description>{post.content}</Description>
        </ReactTagify>

        <PostSnippet href={post.url} target="_blank">
               <SnippetInfo>
                   <SnippetTitle>{post.url_title}</SnippetTitle>
                   <SnippetDescription>{post.url_description}</SnippetDescription>
                   <Url>{post.url}</Url>
               </SnippetInfo> 
               <SnippetImage src={post.url_image} />
           </PostSnippet>
      </PostContent>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 276px;
  background: #171717;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 16px;
  padding: 16px 18px;
  margin-bottom: 16px;
`;
const UserPic = styled.img`
  width: 53px;
  height: 53px;
  border-radius: 26.5px;
`;
const PostContent = styled.div`
  width: 503px;
  height: 170px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* background-color: black; */
  margin-top: 5px;
`;
const Username = styled.h2`
  font-family: "Lato";
  font-weight: 400;
  font-size: 19px;
  color: #ffffff;
  margin-bottom: 10px;
`;
const Description = styled.p`
  font-family: "Lato";
  font-weight: 400;
  font-size: 17px;
  color: #b7b7b7;
  margin-bottom: 10px;
`;

const PostSnippet = styled.a`
    width: 503px;
    height: 155px;
    border: 1px solid #4D4D4D;
    border-radius: 11px;
    display: flex;
    justify-content: space-between;
    font-family: 'Lato';
    font-weight: 400;
    font-size: 17px;
    color: #B7B7B7;
    text-decoration: none;
`
const SnippetImage = styled.img`
    width: 153.44px;
    height: 155px;
    border-radius: 0px 12px 13px 0px;
`

const SnippetInfo = styled.div`
    width: 60%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap:7px;
    margin-left: 19px;
`
const SnippetTitle = styled.h2`
    font-family: 'Lato';
    font-weight: 400;
    font-size: 16px;
    color: #CECECE;
`
const SnippetDescription = styled.p`
    font-family: 'Lato';
    font-weight: 400;
    font-size: 11px;
    color: #9B9595;
`
const Url = styled.p`
    font-family: 'Lato';
    font-weight: 400;
    font-size: 11px;
    color: #CECECE;
`