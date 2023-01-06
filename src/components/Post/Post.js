import styled from "styled-components";
import { ReactTagify } from "react-tagify";
import { useNavigate } from "react-router-dom";
import { BsTrash } from "react-icons/bs";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext.js";
import api from "../../services/api.js";
import { TokenContext } from "../../contexts/TokenContext.js";
import Swal from "sweetalert2";

export default function Post({ post, renderPosts }) {
  const { user } = useContext(UserContext);
  const { token } = useContext(TokenContext);
  const navigate = useNavigate();
  const tagStyle = {
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  };

  async function deletePost() {
    try {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-light',
      },
      buttonsStyling: true
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure you want to delete this post?',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it',
      confirmButtonColor: "blue",
      cancelButtonText: 'No, go back',
      reverseButtons: true,
      background: "black",
      color: "white"
    }).then(async (result) => {
      if (result.isConfirmed) {
        await api.delelePostById(post.id, token);
        renderPosts();
        swalWithBootstrapButtons.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          success: 'success',
          background: "black",
          color: "white"
        })
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: 'Cancelled',
          text: 'Your imaginary file is safe :)',
          background: "black",
          color: "white"
        })
      }
    })
    } catch (err) {
      console.log(err.response.data);
    }
  }

  function goToPostsByHashtagPage(tag) {
    const formattedTag = tag.replace("#", "");
    navigate(`/hashtag/${formattedTag}`);
  }

  function deleteButton() {
    if (post.user_id === Number(user.id)) {
      return (
        <BsTrash
          onClick={deletePost}
          style={{
            color: "white",
            cursor: "pointer",
            position: "absolute",
            right: "20px",
            top: "20px",
          }}
        />
      );
    }
  }
  return (
    <Container>
      <UserPic src={post.profile_picture} alt="User picture" />
      <PostContent>
        <Username>{post.user_name}</Username>
        {deleteButton()}
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
  position: relative;
  justify-content: center;
  align-items: flex-start;
  gap: 16px;
  padding: 16px 18px;
  margin-bottom: 16px;
  position: relative;
`;
const UserPic = styled.img`
  width: 53px;
  height: 53px;
  border-radius: 26.5px;
`;
const PostContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
const SnippetInfo = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 7px;
  margin-left: 19px;
`;
const SnippetTitle = styled.h2`
  font-family: "Lato";
  font-weight: 400;
  font-size: 16px;
  color: #cecece;
`;
const SnippetDescription = styled.p`
  font-family: "Lato";
  font-weight: 400;
  font-size: 11px;
  color: #9b9595;
`;
const Url = styled.p`
  font-family: "Lato";
  font-weight: 400;
  font-size: 11px;
  color: #cecece;
`;
const SnippetImage = styled.img`
  width: 153.44px;
  height: 155px;
  border-radius: 0px 12px 13px 0px;
`;
const PostSnippet = styled.a`
  width: 503px;
  height: 155px;
  border: 1px solid #4d4d4d;
  border-radius: 11px;
  display: flex;

  justify-content: space-between;
  font-family: "Lato";
  font-weight: 400;
  font-size: 17px;
  color: #b7b7b7;
  text-decoration: none;
`;
