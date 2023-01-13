import styled from "styled-components";
import vector from "../../assets/images/vector.png";
import SimpleBar from "simplebar-react";
import { useRef, useState } from "react";
import api from "../../services/api";
import { ColorRing } from "react-loader-spinner";

export default function CommentBox({ post, renderPosts,update, setUpdate, }) {
  const { user } = JSON.parse(localStorage.getItem("userData"));
  const { token } = JSON.parse(localStorage.getItem("userData"));
  const [inputValue, setInputValue] = useState();
  const [loading, setLoading] = useState(false);
  const initialPage = useRef(1);

  function handleKeyPressed(e) {
    if (e.code === "Enter") {
      sendComment();
    }
  }

  console.log(user);

  async function sendComment() {
    try {
      const body = {
        comment: inputValue,
      };
      setLoading(true);
      const promisse = await api.commentPost(token, post.id, body)
      setLoading(false);
      setInputValue("");
      setUpdate(!update)
      console.log(promisse);
    } catch (err) {
      setLoading(false);
      setInputValue("");
      console.log(err.response.data);
    }
  }

  return (
    <>
      <SimpleBar
        style={{
          maxHeight: 210,
          backgroundColor: "#1e1e1e",
          marginTop: "-30px",
          paddingTop: "10px",
          zIndex: "0",
          paddingBottom: "20px",
          bottom: "0px"
        }}
      >
        {post.comments.map((c) => {

          function author() {
            if (c.user_id === post.user_id) {
              return "• post’s author"
            }
          }

          if (c.comment !== null) {
            
            return <UserComment>
              <UserPicture src={c.user_picture} />
              <Infos>
                <UserName>
                  {c.user_name} <p>{author()}</p>
                </UserName>
                <UserCommentText>{c.comment}</UserCommentText>
              </Infos>
            </UserComment>;
          }
        })}
      </SimpleBar>
      <UserCommentInput>
        <ImgProfile src={user.profile_picture} alt="profile_picture" />
        <input
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPressed}
          value={inputValue}
          disabled={loading}
          type="text"
          name="comment"
          id="1"
          placeholder="write a comment..."
        />
        <>
          {loading ? (
            <ColorRing
              visible={true}
              width="50"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={["white", "white", "white", "white", "white"]}
            />
          ) : (
            <ImgVector onClick={sendComment} src={vector} alt="" />
          )}
        </>
      </UserCommentInput>
    </>
  );
}
const UserComment = styled.div`
  width: 95%;
  border-bottom: 1px solid #353535;
  margin: 0 auto;
  display: flex;
`;
const UserPicture = styled.img`
  width: 39px;
  height: 39px;
  margin: 20px;
  border-radius: 26.5px;
`;
const UserName = styled.p`
  color: #f3f3f3;
  font-family: "Lato";
  font-style: normal;
  font-size: 14px;
  display: flex;
  && p {
    margin: 0px 10px;
    color: #565656;
  }
`;
const Infos = styled.div`
  width: 100%;
  height: 50px;
  margin: auto 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const UserCommentText = styled.p`
  color: #acacac;
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
`;
const UserCommentInput = styled.div`
  display: flex;
  background: #1e1e1e;
  border-radius: 0px 0px 16px 16px;
  margin-top: -20px;
  margin-bottom: 10px;
  position: relative;
  top: 0;
  && input {
    font-family: "Lato";
    font-weight: 400;
    font-size: 14px;
    color: #bababa;

    width: 85%;
    height: 39px;
    background: #252525;
    border-radius: 8px;
    border: none;

    margin: 20px 0px;

    box-sizing: border-box;
    padding: 20px;

    &::placeholder {
    font-family: "Lato";
    font-style: italic;
    font-weight: 400;
    font-size: 14px;
    color: #575757;
    }
  }
`;
const ImgVector = styled.img`
  height: 20px;
  position: absolute;
  right: 20px;
  top: 30px;
  cursor: pointer;
`;
const ImgProfile = styled.img`
  width: 39px;
  height: 39px;

  margin: 20px 10px 20px 30px;
  border-radius: 26.5px;
`;
