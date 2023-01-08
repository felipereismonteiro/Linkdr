import styled from "styled-components";
import { ReactTagify } from "react-tagify";
import { useNavigate } from "react-router-dom";
import { BsTrash } from "react-icons/bs";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext.js";
import api from "../../services/api.js";
import { TokenContext } from "../../contexts/TokenContext.js";
import Swal from "sweetalert2";
import axios from "axios";

export default function Post({ post, renderPosts }) {
  console.log(post.url_description)
  const { user } = useContext(UserContext);
  const { setUserPageInfo } = useContext(UserContext);
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
        const promisse = await api.delelePostById(post.id, token);
        renderPosts();
        console.log(promisse);
        swalWithBootstrapButtons.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
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
        <Username onClick={() => {
          setUserPageInfo({user_name: post.user_name, profile_picture: post.profile_picture})
          navigate(`/user/${post.user_id}`);
        }}>{post.user_name}</Username>
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
  @media (max-width: 634px) {
          width: 98vw;
  }

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
  @media (max-width: 634px) {
          width: 100vw;
  }
`;
const Username = styled.h2`
  font-family: "Lato";
  font-weight: 400;
  font-size: 19px;
  color: #ffffff;
  margin-bottom: 10px;
  cursor: pointer;
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
  margin-top: 8px;

  @media (max-width: 420px) {
    margin-left: 11px;
  }
  
`;
const SnippetTitle = styled.div`
  width: 100%;
  min-height: 40px;
  display: flex;
  align-items: center;

  font-family: "Lato";
  font-weight: 400;
  font-size: 16px;
  color: #cecece;
  @media (max-width: 420px) {
    font-size: 11px;  ;
  }
`;
const SnippetDescription = styled.div`
  width: 100%;
  min-height: 50px;
  /* background-color: red; */

  font-family: "Lato";
  font-weight: 400;
  font-size: 11px;
  color: #9B9595;
  @media (max-width: 420px) {
    font-size: 9px;  ;
  }
`;
const Url = styled.div`
  width: 100%;
  min-height: 40px;
  /* background-color: blue; */

  font-family: "Lato";
  font-weight: 400;
  font-size: 11px;
  color: #cecece;
  @media (max-width: 420px) {
    font-size: 9px;  ;
  }
`;
const SnippetImage = styled.img`
  width: 153.44px;
  height: 155px;
  border-radius: 0px 12px 13px 0px;
  @media (max-width: 634px) {
        min-width: 32%;
        max-width: 32%;
  }
`;
const PostSnippet = styled.a`
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
